import { MessageLayout } from 'entities/chat';
import { FC } from 'react';

interface MessageQuestionProps {
  question: string;
  loading: boolean;
  isError: boolean;
  description?: string;
}

export const MessageQuestion: FC<MessageQuestionProps> = ({
  question = '',
  description = '',
  loading = false,
  isError = false,
}) => {
  return (
    <MessageLayout hasIcon isLoading={loading} className="question">
      <p className={isError ? 'error' : ''}>{question}</p>

      {!isError && description ? (
        <p className="description">{description}</p>
      ) : null}
    </MessageLayout>
  );
};
