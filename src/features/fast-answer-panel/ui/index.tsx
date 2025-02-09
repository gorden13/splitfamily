import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Box, Button, Flex } from '@radix-ui/themes';
import { IAnswer, useChatStore } from 'entities/chat';

import { BaseInput, DatePicker } from 'shared/ui';
import ArrowUp from './arrow-up.svg?react';

import './styles.scss';

interface FastAnswerPanelProps {
  fastAnswer: IAnswer;
}

export const FastAnswerPanel: FC<FastAnswerPanelProps> = ({ fastAnswer }) => {
  const [text, setText] = useState('');
  const { addQuestion } = useChatStore();
  const { getCurrentMessage } = useChatStore();
  const message = getCurrentMessage();

  // TODO разобраться с этим
  useEffect(() => {
    setText(fastAnswer.text);
    if (fastAnswer.text) {
      addQuestion(fastAnswer.text);
      setText('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fastAnswer]);

  const inputEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
  };

  const datePickerEvent = (dateStr: string) => {
    setText(dateStr);
  };

  const submitEvent = () => {
    if (!text) {
      return;
    }

    addQuestion(text);
    setText('');
  };

  const inputRender: FC = () => {
    if (message.type === 'date') {
      return <DatePicker value={new Date()} onSelected={datePickerEvent} />;
    }

    return (
      <BaseInput
        value={text}
        disabled={Boolean(!message?.isLoaded || message.fastAnswers.length)}
        type="text"
        onChange={inputEvent}
      />
    );
  };

  if (!message) {
    return false;
  }

  return (
    <div className="fast-answer-panel">
      {inputRender({})}

      <Button
        color="gray"
        variant="soft"
        size="3"
        highContrast
        disabled={Boolean(!message?.isLoaded || !text)}
        onClick={submitEvent}
      >
        <Flex align="center" justify="center">
          <Box width="16px" height="20px">
            <ArrowUp />
          </Box>
        </Flex>
      </Button>
    </div>
  );
};
