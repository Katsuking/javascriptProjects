import { login, register } from '../controllers/authentication';
import express from 'express';

// register の エンドポイントを設定
// http://localhost:8080/auth/register
// {
//   "email": "test@test.com",
//   "password": "test",
//   "username": "testUser"
// }
export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};
