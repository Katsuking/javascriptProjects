const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const jwtPayload = { userId: user.id };
  const jwtOptions = {
    expiresIn: "5m",
  };
  return jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRET, jwtOptions);
};

// jti = jwt id
const generateRefreshToken = (user, jti) => {
  const jwtPayload = {
    userId: user.id,
    jti,
  };

  const jwtOptions = {
    expiresIn: "10h",
  };

  return jwt.sign(jwtPayload, process.env.JWT_REFRESH_SECRET, jwtOptions);
};

const generateToken = (user, jti) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return { accessToken, refreshToken };
};

const verifyToken = (token, jwtSecret) => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    return { error: `${error.name} ${error.message}` };
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
  verifyToken,
};
