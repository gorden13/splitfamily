import { Avatar, Box } from '@radix-ui/themes';
import { ProgressBar } from 'shared/ui';
import { useChatStore } from 'entities/chat';

import './styles.scss';

import Logo from './logo.svg?react';
import User from './user.svg?react';

export const Header = () => {
  const { progress } = useChatStore();

  return (
    <header>
      <div className="header base-wrapper">
        <div className="header__logo">
          <Logo />

          <h3 className="header__title">AI поможет составить план развода</h3>
        </div>

        <div className="header__user-panel">
          <Avatar
            variant="soft"
            fallback={
              <Box width="20px" height="20px">
                <User />
              </Box>
            }
            color="gray"
          />
        </div>

        <ProgressBar
          progress={progress}
          startText="Осталось до составления плана"
          endText="Готовый план развода"
        />
      </div>
    </header>
  );
};
