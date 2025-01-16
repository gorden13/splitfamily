import { ChangeEvent, useState } from 'react';
import { Box, Button, Flex } from '@radix-ui/themes';
import { useChatStore } from 'entities/chat';

import './styles.scss';
import { BaseInput } from 'shared/ui';
import ArrowUp from './arrow-up.svg?react';

export const FastAnswerPanel = () => {
  const [text, setText] = useState('');
  const { addQuestion } = useChatStore();

  const inputEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
  };

  const submitEvent = () => {
    addQuestion(text);

    setText('');
  };

  return (
    <div className="fast-answer-panel base-wrapper">
      <BaseInput value={text} type="text" onChange={inputEvent} />

      <Button
        color="gray"
        variant="soft"
        size="3"
        highContrast
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
