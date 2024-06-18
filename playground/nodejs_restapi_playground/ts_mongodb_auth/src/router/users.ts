import { isAuthenticated, isOwner } from '../middelwares';
import {
  deleteUser,
  getAllUser,
  updateUser,
} from '../controllers/users.controllers';
import express from 'express';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUser);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
