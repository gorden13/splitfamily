import { client } from 'shared/api/client';
import type {
  AnswerMessage,
  HttpResponse,
  Question,
  Document,
} from 'shared/api/schema/Api';
import { delay, getFakeResponse } from 'shared/lib';

let questionCount = 1;

const questionsArray: Question[] = [
  {
    message_content: 'Вы планируете развод?',
    message_type: 'yes/no',
    question_id: '079d420f-3074-4fde-8b39-8e26185646e8',
  },
  {
    message_content: 'Укажите дату развода',
    message_type: 'date',
    question_id: '9a5e822d-b81b-4353-9ad7-fa26066bd986',
  },
  {
    message_content: 'Укажите причину развода (кратко)',
    message_type: 'text',
    question_id: 'b7691af1-a823-49f6-a9e4-954523df8a7a',
  },
  {
    message_content: 'Проживаете ли вы на данный момент вместе?',
    message_type: 'yes/no',
    question_id: '87ca03f2-dab9-401d-8c68-1c03a0a2eb11',
  },
  {
    message_content: 'Имеются ли у вас совместные дети?',
    message_type: 'yes/no/not_all',
    question_id: '91965588-33ff-40ef-a119-dd8c472ad64e',
  },
  {
    message_content: 'Проживают ли дети совместно с вами',
    message_type: 'yes/no/not_all',
    question_id: '893beec4-8655-4679-a734-7a3c891eb0ed',
  },
  {
    message_content: 'Укажите имена и возраст детей',
    message_type: 'text',
    question_id: 'a72ec8b9-80f8-4603-907a-4f5255f058c8',
  },
  {
    message_content: 'Имеется ли у вас совместное имущество?',
    message_type: 'yes/no/not_all',
    question_id: 'b1eed0fb-fa10-4f12-ac25-365b314dbb28',
  },
  {
    message_content: 'Укажите какое имущество принадлежит лично вам',
    message_type: 'text',
    question_id: 'f9568cad-e6e0-439b-be36-940d48a019bd',
  },
  {
    message_content: 'Существуют ли между вами споры по разделению имущества?',
    message_type: 'yes/no',
    question_id: '6333a224-4248-4d1f-bc0a-5712b5bc504e',
  },
  {
    message_content: 'С кем из супругов будут жить дети?',
    message_type: 'text',
    question_id: '4f20a9e6-d02a-4627-a0ac-ae300a9c3c6e',
  },
  {
    message_content: 'Всё готово, начинаем формировать краткий план развода',
    message_type: 'ready_to_generate',
    question_id: '41359799-3738-441e-93c1-5f2803a6d9d3',
  },
];

export const initChat = async (): Promise<HttpResponse<Question>> => {
  try {
    // return await client.chat.createChatCreatePost();
    await delay(1000);
    const initQuestion = getFakeResponse(questionsArray[0]);
    return initQuestion;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const chatAnswer = async (): Promise<HttpResponse<AnswerMessage>> => {
  try {
    // return await client.chat.sendMessageChatSendMessagePost(data);

    const question = questionsArray[questionCount];
    questionCount += 1;

    const answer: AnswerMessage = {
      progress: questionCount * 5,
      question,
      document: questionCount === 10 ? ({} as Document) : undefined,
    };

    const response = getFakeResponse(answer);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const generateReport = async (): Promise<HttpResponse<Document>> => {
  try {
    return await client.chat.generateReport();
  } catch (error) {
    return Promise.reject(error);
  }
};
