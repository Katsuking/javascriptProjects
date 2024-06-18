import { getUserBySessionToken } from '../db/user';
import { NextFunction, Request, Response } from 'express';
import { get, merge } from 'lodash';

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const currentUserId = (<string>(
      (<unknown>get(req, 'identity._id')) // isAuthenticated で追加された情報を取得
    )) as string;
    console.log(currentUserId.toString());
    if (!currentUserId || currentUserId.toString() !== id) {
      return res
        .status(403)
        .json({ message: 'you are not allowed to do this operation' });
    }

    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: 'something went wrong!' });
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionToken = req.cookies['test-auth'];
    if (!sessionToken) {
      return res.status(403).json({ message: 'unauthorized' });
    }

    const exisitingUser = await getUserBySessionToken(sessionToken);
    if (!exisitingUser) {
      return res.status(403).json({ message: 'unauthorized' });
    }

    merge(req, { identity: exisitingUser }); // reqに "identity._id"で情報を追加する
    // console.log('cookie:', sessionToken);

    return next();
  } catch (e) {
    console.log('error', e);
    return res.status(400).json({ message: 'something went wrong!' });
  }
};
