import { FC } from 'react';
import { Button } from '@radix-ui/themes';
import { IAnswer } from 'entities/chat';

import './styles.scss';

interface FastAnswersButtonsProps {
  fastAnswers: IAnswer[];
  onClick: (answer: IAnswer) => void;
}

export const FastAnswersButtons: FC<FastAnswersButtonsProps> = ({
  fastAnswers,
  onClick,
}) => {
  return (
    <div className="fast-answers-buttons">
      {fastAnswers.map((answer) => (
        <Button
          color="gray"
          variant="soft"
          key={answer.id}
          onClick={() => onClick(answer)}
        >
          {answer.text}
        </Button>
      ))}
    </div>
  );
};
