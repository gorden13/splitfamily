import { FC, ReactNode } from 'react';

import './styles.scss';
import Robot from 'shared/icons/robot.svg?react';
import { InlineSpinner } from 'shared/ui';

interface MessageLayoutProps {
  isLoading?: boolean;
  hasIcon?: boolean;
  children: ReactNode;
  className?: string;
}

export const MessageLayout: FC<MessageLayoutProps> = ({
  children,
  className,
  hasIcon = true,
  isLoading = false,
}) => {
  return (
    <div
      className={className ? `message-layout ${className}` : 'message-layout'}
    >
      {hasIcon ? <Robot /> : null}

      {isLoading ? <InlineSpinner /> : children}
    </div>
  );
};
