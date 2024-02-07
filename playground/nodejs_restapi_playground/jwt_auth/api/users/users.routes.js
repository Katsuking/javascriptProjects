const express = require("express");
// const { isAuthenticated } = require("../middleware");
const { getUserById } = require("../../utils/users");
const { verifyToken } = require("../../utils/jwt");

const router = express.Router();

// request に渡されたトークンの検証
// middleware
router.use("/profile/", (req, res, next) => {
  console.log("using middleware...");
  const { authorization } = req.headers; // authorization headerを確認する
  if (!authorization) {
    console.log("ヘッダーが存在しない");
    res.error = { error: "Unauthorized !!" };
  }

  try {
    const token = authorization.split(" ")[1];
    console.log("トークン", token);
    const payload = verifyToken(token, process.env.JWT_REFRESH_SECRET);
    req.payload = payload; // 後で使用する
    console.log("request 事前処理 (payload);", req.payload);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.error = { error: "Token expired !!" };
    }
    res.error = { error: "🚫 Un-Authorized 🚫" };
  }

  return next();
});

// このエンドポイントを使用するには、
// /login エンドポイントから取得した
// アクセストークンとAuthorization ヘッダーを使ってアクセスする
router.get("/profile", async (req, res, next) => {
  try {
    console.log("get /profile");
    if (res.error) {
      console.log("前処理でエラーが出る場合: ", res.error);
      return res.json(res.error);
    }
    const { userId } = req.payload;
    if (!userId) {
      return res.json({ error: "userId is missing" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.json({ error: "Could not find user with id" });
    }
    delete user.password; // passwordは必ず消すこと
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
