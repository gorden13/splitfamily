import { useState } from 'react';
import { useBetween } from 'use-between';
import { delay } from 'shared/lib';
import { HTTPValidationError } from 'shared/api/schema/Api';
import { Answer } from '../model';
import { IMessage } from '../types';
import { chatAnswer, initChat } from '../api';

const MAIN_ERROR_TEXT =
  'Что-то пошло не так, не удаётся получить ответ. Попробуйте еще раз.';

const useChatState = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [progress, setProgress] = useState(0);

  const outputErrorMessage = (error: unknown): void => {
    const errorObject = error as HTTPValidationError;
    // eslint-disable-next-line no-console
    console.log({ title: errorObject.detail?.[0].msg ?? MAIN_ERROR_TEXT });
  };

  const addMessage = (message: IMessage): void => {
    setMessages((prev) => [...prev, message]);
  };

  const getNewId = (): number => {
    return messages.length + 1;
  };

  const getFastAnswers = (type: IMessage['type']): string[] => {
    switch (type) {
      case 'yes/no':
        return ['Да', 'Нет'];
      case 'yes/no/not_all':
        return ['Да', 'Нет', 'Не все'];
      default:
        return [];
    }
  };

  const addQuestion = async (text: string) => {
    const answer = new Answer(getNewId(), text);
    addMessage(answer);

    const currentMessage: IMessage = {
      id: 1,
      slug: 'question',
      type: 'yes/no',
      text: '',
      isLoaded: false,
      fastAnswers: [],
      internalId: '',
      isError: false,
    };

    addMessage(currentMessage);

    await delay(1000);

    try {
      const result = await chatAnswer({ user_answer: text });

      if (currentMessage) {
        currentMessage.text = result.data.question.message_content;
        currentMessage.internalId = result.data.question.question_id;
        currentMessage.type = result.data.question
          .message_type as IMessage['type'];
        currentMessage.fastAnswers = getFastAnswers(currentMessage.type);
        currentMessage.isLoaded = true;

        setProgress(result.data.progress);

        // if (currentMessage.type === 'not_expected') {
        //   progress = 100;
        // }

        if (currentMessage.type === 'ready_to_generate') {
          currentMessage.slug = 'generate';
        }
      }

      return currentMessage;
    } catch (error) {
      currentMessage.isError = true;
      currentMessage.text = MAIN_ERROR_TEXT;
      currentMessage.isLoaded = true;

      outputErrorMessage(error);

      return currentMessage;
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const addAnswer = (message: string) => {
    const answerInstance = new Answer(getNewId(), message);

    setMessages((prev) => [...prev, answerInstance]);
  };

  const init = async (): Promise<IMessage> => {
    const initialMessage: IMessage = {
      id: 1,
      slug: 'question',
      type: 'yes/no',
      text: '',
      isLoaded: false,
      fastAnswers: [],
      internalId: '',
      isError: true,
    };

    try {
      const response = await initChat();

      initialMessage.type = response.data.message_type as IMessage['type'];
      initialMessage.text = response.data.message_content;
      initialMessage.internalId = response.data.question_id;
      initialMessage.fastAnswers = getFastAnswers(initialMessage.type);
      initialMessage.isLoaded = true;

      addMessage(initialMessage);

      return initialMessage;
    } catch (error) {
      initialMessage.isError = true;
      initialMessage.text = MAIN_ERROR_TEXT;
      initialMessage.isLoaded = true;
      addMessage(initialMessage);

      outputErrorMessage(error);

      return initialMessage;
    }
  };

  return {
    init,
    messages,
    addQuestion,
    addAnswer,
    clearMessages,
    progress,
    setProgress,
  };
};

const useChatStore = () => useBetween(useChatState);

export { useChatStore };
