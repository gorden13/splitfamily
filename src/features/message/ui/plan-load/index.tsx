import { FC } from 'react';
import { Button } from '@radix-ui/themes';
import { MessageLayout } from 'entities/chat';

import Load from './load.svg?react';

interface PlanLoadProps {
  isLoading: boolean;
  onLoad: () => void;
}

export const PlanLoad: FC<PlanLoadProps> = ({ isLoading, onLoad }) => {
  return (
    <MessageLayout isLoading={isLoading} className="plan-load">
      <div className="content">
        <p>
          Нажмите на кнопку «скачать» и получите план развода в формате PDF.
        </p>

        <Button variant="surface" onClick={onLoad}>
          Скачать <Load />
        </Button>
      </div>
    </MessageLayout>
  );
};
