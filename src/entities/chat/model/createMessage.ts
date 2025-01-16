/* eslint-disable max-classes-per-file */
import type { IMessage } from '../types';

class Message implements IMessage {
  id: number;

  text = '';

  slug: IMessage['slug'] = 'question';

  type: IMessage['type'] = 'text';

  isError = false;

  isLoaded = true;

  fastAnswers: string[] = [];

  progress: number = 0;

  constructor(id: number) {
    this.id = id;
  }
}

export class Answer extends Message {
  constructor(id: number, text: string) {
    super(id);

    this.slug = 'answer';
    this.text = text;
  }
}

export class Question extends Message {
  description: string | undefined = '';

  constructor(id: number, description?: string) {
    super(id);

    this.description = description;
    this.isLoaded = false;
  }
}
