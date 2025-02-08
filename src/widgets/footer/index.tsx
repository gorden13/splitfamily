import { useState } from 'react';

import { FastAnswerPanel } from 'features/fast-answer-panel';
import { FastAnswersButtons } from 'features/fast-answers-list';

import { IAnswer, useChatStore } from 'entities/chat';

import './styles.scss';

export const Footer = () => {
  const [answer, setAnswer] = useState<IAnswer>({ id: 0, text: '' });
  const { getCurrentMessage } = useChatStore();
  const { fastAnswers } = getCurrentMessage();

  const onAnswerSetEvent = (message: IAnswer) => {
    setAnswer(message);
  };

  return (
    <footer className="footer">
      <div className="answer-panel base-wrapper">
        <FastAnswersButtons
          fastAnswers={fastAnswers ?? []}
          onClick={onAnswerSetEvent}
        />

        <FastAnswerPanel fastAnswer={answer} />
      </div>
    </footer>
  );
};
