const { db } = require("./db");
const { hashToken } = require("./hashToken");

const saveRefreshToken = ({ jti, refreshToken, userId }) => {
  const hashedToken = hashToken(refreshToken);
  const newRefreshToken = db.refreshToken.create({
    data: {
      id: jti,
      hashedToken,
      userId,
    },
  });

  return newRefreshToken;
};

const getRefreshToken = (id) => {
  const exisitingRefreshToken = db.refreshToken.findUnique({
    where: { id },
  });

  return exisitingRefreshToken;
};

// soft delete token
const deleteRefreshToken = (id) => {
  const deletedRefreshToken = db.refreshToken.update({
    where: { id },
    data: {
      revoked: true,
    },
  });

  return deletedRefreshToken;
};

const revokeTokens = (userId) => {
  const revokedRefreshTokens = db.refreshToken.updateMany({
    where: { userId },
    data: {
      revoked: true,
    },
  });
  return revokedRefreshTokens;
};

module.exports = {
  saveRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
  revokeTokens,
};
