import { MessageLayout } from 'entities/chat';

import { FC } from 'react';
import Error from './error.svg?react';

import './styles.scss';

interface MessageAnswerProps {
  answer: string;
  isError?: boolean;
}

export const MessageAnswer: FC<MessageAnswerProps> = ({
  answer,
  isError = false,
}) => {
  return (
    <MessageLayout hasIcon={false} isLoading={isError} className="answer">
      {isError ? <Error /> : null}

      {answer}
    </MessageLayout>
  );
};
