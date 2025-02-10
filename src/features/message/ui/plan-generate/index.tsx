import { FC } from 'react';
import { Button } from '@radix-ui/themes';
import { MessageLayout } from 'entities/chat';

import Rocket from './rocket.svg?react';

import './styles.scss';

interface PlanGenerateProps {
  isLoading: boolean;
  onGenerate: () => void;
}

export const PlanGenerate: FC<PlanGenerateProps> = ({
  isLoading,
  onGenerate,
}) => {
  return (
    <MessageLayout isLoading={isLoading} className="generate-plan">
      <div className="content">
        <p>
          Спасибо, я собрал всю нужную информацию для составления плана развода.
        </p>

        <Button variant="surface" onClick={onGenerate}>
          Сгенерировать план развода <Rocket />
        </Button>
      </div>
    </MessageLayout>
  );
};
