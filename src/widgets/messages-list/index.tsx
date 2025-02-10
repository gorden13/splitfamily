import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { IMessage, useChatStore } from 'entities/chat';
import { MessageAnswer, PlanGenerate, PlanLoad } from 'features/message';
import { MessageQuestion } from 'features/message/ui/question';
import { useOnMountUnsafe } from 'shared/hooks';

import './styles.scss';

export const MessagesList: FC = () => {
  const { messages, init, addQuestion, planGenerate, report } = useChatStore();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const generatePlan = async () => {
    await planGenerate();
  };

  const downloadPlan = () => {
    const { uri } = report;

    window.open(uri, '_blank');
  };

  useEffect(() => {
    scrollToBottom();
  }, [addQuestion]);

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

    if (slug === 'generate') {
      return <PlanGenerate isLoading={!isLoaded} onGenerate={generatePlan} />;
    }

    if (slug === 'download') {
      return <PlanLoad isLoading={!isLoaded} onLoad={downloadPlan} />;
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

      <div ref={messagesEndRef} />
    </div>
  );
};
