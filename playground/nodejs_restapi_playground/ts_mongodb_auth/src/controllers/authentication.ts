import { createUser, getUserByEmail } from '../db/user';
import express, { Request, Response } from 'express';
import { authentication, random } from '../helpers';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email, password are required' });
    }

    // userの確認
    // デフォルトでは除外されているauthentication.saltとauthentication.passwordフィールドを結果に含めます
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password',
    );
    if (!user) {
      return res.status(400).json({ message: 'authentication failed' });
    }
    console.log('user:', user);

    // password validation
    const expectedHash = authentication(user.authentication?.salt!, password);
    if (user.authentication?.password !== expectedHash) {
      return res.status(400).json({ message: 'authentication failed' });
    }

    // sessionの新規登録
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString(),
    );
    await user.save();

    // cookieの設定
    res.cookie('test-auth', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    return res.status(200).json(user).end();
  } catch (e) {
    console.log('something went wrong', e);
    return res.status(400).json({ message: 'something went wrong' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    // extract data from body
    const { email, password, username } = req.body; // schemaで定義
    if (!email || !password || !username) {
      console.log('email, password and username are required');
      return res
        .status(400)
        .json({ message: 'email, password and username are required' });
    }

    const exisitingUser = await getUserByEmail(email);
    if (exisitingUser) {
      console.log('user is already registered');
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password), // 暗号化したパスワードの生成
      },
    });

    return res.status(200).json(user).end();
  } catch (e) {
    console.log('something went wrong', e);
    return res.status(400).json({ message: 'something went wrong' });
  }
};
