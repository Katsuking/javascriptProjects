const jwt = require("jsonwebtoken");
const sleep = require("sleep");

// payload
const jwtPayload = {
  email: "test@example.com",
  name: "test jwt",
};

// secret
const jwtSecret = "this_is_secret";

// 使用されるアルゴリズム等
const jwtOptions = {
  algorithm: "HS256",
  // expiresIn: "3m",
  expiresIn: "3s",
};

// トークンの作成
const token = jwt.sign(jwtPayload, jwtSecret, jwtOptions);
// console.log("token: ", token);

// sleep.sleep(5); // 検証のために、有効期間を調整

// トークンの検証
const payload = jwt.verify(token, jwtSecret, (err, decoded) => {
  if (err) {
    console.log("Error: ", err.message);
  } else {
    console.log("token verified!!");
    console.log("token:", decoded);
  }
});

const verifiedToken = jwt.verify(token, jwtSecret);

console.log(verifiedToken.jti);
