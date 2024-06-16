import express from 'express';
import authentication from './authentication';

// すべてのrouter はここに記載すること
const router = express.Router();
export default (): express.Router => {
  authentication(router);
  return router;
};
