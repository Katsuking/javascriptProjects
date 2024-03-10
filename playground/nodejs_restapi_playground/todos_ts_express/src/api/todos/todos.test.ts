import request from 'supertest';
import app from '../../app';

// import { db } from '../../lib/db';
// beforeAll(async () => {
//   // 実行前にテーブルを空にする
//   try {
//     await db.todos.deleteMany();
//   } catch (error) {}
// });

// jest.useFakeTimers();

describe('GET /api/v1/todos', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200) // jest よりこのsupertestの方が書きやすい同じ
      .then((response) => {
        expect(response.status).toBe(200); // supertest 使わなくても書ける
        // expect(response.body.length).toBe(2); // beforeAll を定義しない場合は、データ追加したら変更すること
        expect(response.body[0]).toHaveProperty('content'); // zod や prisma.schemaで定義されている
        expect(response.body[0]).toHaveProperty('done');
        done();
      });
  });
});

let id = 'cltbb8kj30000z2l2pfnpvp28';
describe('GET /api/v1/todos', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200) // jest よりこのsupertestの方が書きやすい同じ
      .then((response) => {
        expect(response.status).toBe(200); // supertest 使わなくても書ける
        expect(response.body.id).toBe(id);
        expect(response.body).toHaveProperty('content'); // zod や prisma.schemaで定義されている
        expect(response.body).toHaveProperty('done');
        done();
      });
  });
});

describe('PUT /api/v1/todos:id responds with a single todo', () => {
  it('responds with a json message', (done) => {
    request(app)
      .put(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .send({
        content: 'hello world',
        done: false,
      })
      .expect('Content-Type', /json/)
      .expect(204) // jest よりこのsupertestの方が書きやすい同じ
      .then((response) => {
        expect(response.status).toBe(200); // supertest 使わなくても書ける
        expect(response.body.id).toBe(id);
        expect(response.body).toHaveProperty('content'); // zod や prisma.schemaで定義されている
        expect(response.body).toHaveProperty('done');
      });
    done();
  });
});

// TODO: なぜかうまくいかん 原因要チェ
// describe('POST /api/v1/todos', () => {
//   it('responds with an error if the todo is invalid', (done) => {
//     request(app)
//       .post('/api/v1/todos')
//       .set('Accept', 'application/json')
//       .send({
//         content: 'Learn TypeScript',
//         done: false,
//       })
//       .expect('Content-Type', /json/)
//       .expect(201)
//       .then((response) => {
//         console.log(response.body.message);
//         expect(response.body).toHaveProperty('content');
//         expect(response.body).toHaveProperty('done');
//         done();
//       });
//   });
// });
