import { FC } from 'react';

import './styles.scss';

export const InlineSpinner: FC = () => {
  return (
    <div className="spinner">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
};
