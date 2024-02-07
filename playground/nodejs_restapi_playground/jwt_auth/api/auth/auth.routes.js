const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { generateToken, verifyToken } = require("../../utils/jwt");
const {
  saveRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
} = require("../../utils/auth");
const {
  getUserByEmail,
  createUserByEmailAndPassword,
  getUserById,
} = require("../../utils/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hashToken } = require("../../utils/hashToken");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      // throw new Error("You must provide an email and a password");
      return res.json({ error: "Invalid email or password." });
    }

    const exisitingUser = await getUserByEmail(email);
    if (exisitingUser) {
      res.status(400);
      // throw new Error("Email already in use.");
      return res.json({ error: "Email already in use." });
    }

    const newUser = await createUserByEmailAndPassword({ email, password });
    const jti = uuidv4();
    const { accessToken, refreshToken } = await generateToken(newUser, jti);
    await saveRefreshToken({
      jti,
      refreshToken,
      userId: newUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      return res.json({ error: "Email or password is missing" });
    }

    // ユーザーの存在確認
    const exisitingUser = await getUserByEmail(email);
    if (!exisitingUser) {
      res.status(403);
      return res.json({ error: "Invalid email !!" });
    }

    // 入力されたパスワードの比較
    const validPassword = bcrypt.compare(password, exisitingUser.password);
    if (!validPassword) {
      res.status(403);
      return res.json({ error: "Invalid password !!" });
    }

    // refresh tokenの保存
    const jti = uuidv4();
    const { accessToken, refreshToken } = await generateToken(
      exisitingUser,
      jti
    );
    await saveRefreshToken({
      jti,
      refreshToken,
      userId: exisitingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

// ユーザーを長期間ログインさせるため、
// refreshTokenを新規で発行
// リクエストのrefreshTokenがjwtとして有効であるか
// DB内部にきちんと保存されているか
router.post("/refreshToken", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      return res.json({ error: "Missing refresh token !!" });
    }

    // トークンの検証(JWT)
    const payload = await verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    if (payload.error) {
      res.json({ error: payload.error });
    }

    // トークンの検証(DB)
    const exisitingRefreshToken = await getRefreshToken(payload.jti);
    if (!exisitingRefreshToken || exisitingRefreshToken.revoked === true) {
      res.status(401);
      return res.json({ error: "Unauthorized !" });
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== exisitingRefreshToken.hashedToken) {
      res.status(401);
      return res.json({ error: "Unauthorized !" });
    }

    const exisitingUser = getUserById(payload.userId);
    if (!exisitingUser) {
      res.status(401);
      return res.json({ error: "Unauthorized !" });
    }

    // トークンの無効化
    const deletedRefreshToken = await deleteRefreshToken(
      exisitingRefreshToken.id
    );
    if (!deletedRefreshToken) {
      return res.json({
        error: `Could not soft delete a token ${exisitingRefreshToken.id}`,
      });
    }

    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateToken(
      exisitingUser,
      jti
    );

    const newToken = await saveRefreshToken({
      jti,
      refreshToken: newRefreshToken,
      userId: exisitingUser.id,
    });
    if (!newToken) {
      return res.json("Could not create a new token. Please try again");
    }

    return res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
