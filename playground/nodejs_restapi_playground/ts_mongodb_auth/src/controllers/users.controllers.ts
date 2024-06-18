import { deleteUserById, getUserById, getUsers } from '../db/user';
import { Request, Response } from 'express';

// localhost:8080/users
// ログイン済みでcookieが存在していること
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'something went wrong!' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    console.log(deletedUser);
    return res.status(204).json(deletedUser).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'something went wrong!' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const { id } = req.params;
    if (!username) {
      return res.status(400).json({ message: 'invalid request' });
    }

    const user = await getUserById(id);
    if (!id || !user) {
      return res.status(400).json({ message: 'invalid request' });
    }

    user.username = username;
    await user.save();

    return res.status(200).json({ message: 'username is updated!' }).end();
  } catch (e) {
    return res.status(400).json({ message: 'something went wrong!' });
  }
};
