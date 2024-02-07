const bcrypt = require("bcrypt");
const { db } = require("./db");

const getUserByEmail = (email) => {
  const user = db.user.findUnique({
    where: { email },
  });
  if (!user) console.log("Could not find a user with email");

  return user;
};

const getUserById = (id) => {
  const user = db.user.findUnique({
    where: { id },
  });
  return user;
};

const createUserByEmailAndPassword = (user) => {
  user.password = bcrypt.hashSync(user.password, 12);
  const newUser = db.user.create({
    data: user,
  });
  return newUser;
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUserByEmailAndPassword,
};
