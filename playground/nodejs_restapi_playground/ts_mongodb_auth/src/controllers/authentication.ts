import { createUser, getUserByEmail } from '../db/user';
import { NextFunction, Request, Response } from 'express';
import { authentication, random } from '../helpers';
import { AuthenticationError } from '../errors/AuthenticationError';

// localhost:8080/auth/login
// {
//   "email": "test@test2.com",
//   "password": "aiueo"
// }
// postmanでクッキーが保存されていることを確認
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
      // next(new AuthenticationError('Auth error')); // custom error handlerを使う場合
    }
    // console.log('user:', user);

    // password validation
    const expectedHash = authentication(user!.authentication?.salt!, password);
    if (user!.authentication?.password !== expectedHash) {
      return res.status(400).json({ message: 'authentication failed' });
    }

    // sessionの新規登録
    const salt = random();
    user!.authentication.sessionToken = authentication(
      salt,
      user!._id.toString(),
    );
    await user!.save(); // session情報を含めて、DB保存

    // cookieの設定
    res.cookie('test-auth', user!.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    return res.status(200).json(user).end();
  } catch (e) {
    console.log('something went wrong', e);
    return res.status(400).json({ message: 'something went wrong' });
  }
};

// localhost:8080/auth/register
// {
//   "email": "test@test2.com",
//   "password": "aiueo",
//   "username": "testUser"
// }
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
      return res.status(400).json({ message: 'user already exist' });
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
