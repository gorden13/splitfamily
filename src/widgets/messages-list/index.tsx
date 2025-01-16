import React, { FC, ReactNode } from 'react';
import { IMessage, useChatStore } from 'entities/chat';
import { MessageAnswer } from 'features/message';
import { MessageQuestion } from 'features/message/ui/question';
import { useOnMountUnsafe } from 'shared/hooks';

import './styles.scss';

export const MessagesList: FC = () => {
  const { messages, init } = useChatStore();

  useOnMountUnsafe(() => {
    init();
  });

  const renderMessageComponent: FC<IMessage> = ({
    slug,
    text,
    isLoaded,
    isError,
    description = '',
  }): ReactNode => {
    if (slug === 'answer') {
      return <MessageAnswer answer={text} isError={isError} />;
    }

    return (
      <MessageQuestion
        isError={isError}
        question={text}
        loading={!isLoaded}
        description={description}
      />
    );
  };

  return (
    <div className="messages-list">
      {messages.map((item) => (
        <React.Fragment key={item.id}>
          {renderMessageComponent(item)}
        </React.Fragment>
      ))}
    </div>
  );
};
