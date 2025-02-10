import { useState } from 'react';
import { useBetween } from 'use-between';
import { delay } from 'shared/lib';
import { HTTPValidationError } from 'shared/api/schema/Api';
import { Answer, Question } from '../model';
import { IAnswer, IMessage } from '../types';
import { chatAnswer, generateReport, initChat } from '../api';

const MAIN_ERROR_TEXT =
  'Что-то пошло не так, не удаётся получить ответ. Попробуйте еще раз.';

const useChatState = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState({
    filename: '',
    filesize: 0,
    uri: '',
  });

  const outputErrorMessage = (error: unknown): void => {
    const errorObject = error as HTTPValidationError;
    // eslint-disable-next-line no-console
    console.log({ title: errorObject.detail?.[0].msg ?? MAIN_ERROR_TEXT });
  };

  const addMessage = (message: IMessage): void => {
    setMessages((prev) => [...prev, message]);
  };

  const getCurrentMessage = (): IMessage =>
    messages.length ? messages[messages.length - 1] : ({} as IMessage);

  const getNewId = (): number => {
    return messages.length + 1;
  };

  const getFastAnswers = (type: IMessage['type']): IAnswer[] => {
    switch (type) {
      case 'yes/no':
        return [
          { id: 1234, text: 'Да' },
          { id: 1235, text: 'Нет' },
        ];
      case 'yes/no/not_all':
        return [
          { id: 1236, text: 'Да' },
          { id: 1237, text: 'Нет' },
          { id: 1238, text: 'Не все' },
        ];
      default:
        return [];
    }
  };

  const addQuestion = async (text: string) => {
    const answer = new Answer(getNewId(), text);
    addMessage(answer);

    const currentMessage: IMessage = {
      id: '',
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
      const result = await chatAnswer();

      if (currentMessage) {
        currentMessage.id = result.data.question.question_id;
        currentMessage.text = result.data.question.message_content;
        currentMessage.internalId = result.data.question.question_id;
        currentMessage.type = result.data.question
          .message_type as IMessage['type'];
        currentMessage.fastAnswers = getFastAnswers(currentMessage.type);
        currentMessage.isLoaded = true;

        setProgress(result.data.progress);

        if (currentMessage.type === 'ready_to_generate') {
          setProgress(85);
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
      id: 0,
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

      initialMessage.id = response.data.question_id;
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

  const planGenerate = async () => {
    const newId = getNewId();

    const question = new Question(newId);
    addMessage(question);

    try {
      const result = await generateReport();
      question.type = 'widget/download';
      question.slug = 'download';

      setReport({
        filename: result.data.filename,
        filesize: result.data.filesize,
        uri: result.data.uri,
      });

      setProgress(100);
    } catch (error) {
      question.isError = true;
      question.text = MAIN_ERROR_TEXT;

      outputErrorMessage(error);
    } finally {
      question.isLoaded = true;
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
    getCurrentMessage,
    planGenerate,
    report,
  };
};

const useChatStore = () => useBetween(useChatState);

export { useChatStore };
