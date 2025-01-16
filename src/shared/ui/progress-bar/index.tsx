import { Flex, Progress } from '@radix-ui/themes';

type LayoutProps = {
  startText: React.ReactNode;
  endText: React.ReactNode;
  progress: number;
};

export const ProgressBar = ({ startText, endText, progress }: LayoutProps) => {
  return (
    <Flex className="header__progress" direction="column" gap="2">
      <Progress value={progress} variant="soft" color="indigo" />

      <Flex align="center" justify="between">
        <span>{startText}</span>

        <span>{endText}</span>
      </Flex>
    </Flex>
  );
};
