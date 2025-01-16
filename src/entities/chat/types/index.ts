type TMessageType =
  | 'text'
  | 'date'
  | 'number'
  | 'yes/no'
  | 'yes/no/not_all'
  | 'not_expected'
  | 'final'
  | 'widget/generate'
  | 'widget/download'
  | 'ready_to_generate';

type TMessageSlug = 'question' | 'answer' | 'generate' | 'download';

export interface IMessage {
  id: number;
  text: string;
  slug: TMessageSlug;
  type: TMessageType;
  description?: string;
  isLoaded: boolean;
  isError: boolean;
  fastAnswers: string[];
  internalId?: string;
}
