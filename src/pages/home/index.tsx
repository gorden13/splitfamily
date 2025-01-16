import { FC } from 'react';

import './styles.scss';
import { MessagesList } from 'widgets/messages-list';

export const HomePage: FC = () => {
  return (
    <div className="home-page base-wrapper">
      <MessagesList />
    </div>
  );
};
