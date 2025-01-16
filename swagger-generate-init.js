import path from 'path';
import process from 'process';

import { generateApi } from 'swagger-typescript-api';

generateApi({
  name: 'Api.ts',
  input: './splitfamily-swagger-generate.yml',
  // url: 'http://45.141.78.253:8020/docs',
  output: path.resolve(process.cwd(), './src/shared/api/schema'),
  httpClientType: 'fetch',
  singleHttpClient: false,
});
