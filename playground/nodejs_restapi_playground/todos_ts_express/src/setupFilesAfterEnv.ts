import { db } from './lib/db';

global.afterAll(async () => {
  // test終了後に, dbへの接続を切る
  // jest.config.js に定義
  await db.$disconnect;
});
