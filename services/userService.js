const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");
const HTTPCustomError = require("../common/HTTPCustomError");

const signUp = async (email, password) => {
  if (password.length < 8) {
    throw HTTPCustomError("PASSWORD_TOO_SHORT", 400);
  }

  const checkEmail = await userDao.getUserByEmail(email);

  if (checkEmail.length !== 0) {
    throw HTTPCustomError("EXSITING_USER", 409);
  }

  const hashed = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const createUser = await userDao.createUser(email, hashed);

  return createUser;

  next(err);
};

const login = async (email, password) => {
  const selectUserInDB = await userDao.getUserByEmail(email);

  if (selectUserInDB.length === 0) {
    throw HTTPCustomError("INVALID_USER", 400);
  }

  const passwordInDB = selectUserInDB[0].password;
  const isPasswordRight = bcrypt.compareSync(password, passwordInDB);

  if (!isPasswordRight) {
    throw HTTPCustomError("INVALID_USER", 400);
  }

  const accessToken = jwt.sign(
    { id: selectUserInDB[0].id },
    process.env.SECREAT_KEY
  );

  return accessToken;
};

const getUsers = async () => {
  const users = await userDao.getUsers();
  return users;
};

const updatePassword = async (email, password, newpassword) => {
  console.log(
    "email:",
    email,
    "password:",
    password,
    "newpassword:",
    newpassword
  );

  if (newpassword.length < 8) {
    throw HTTPCustomError("PASSWORD_TOO_SHORT", 400);
  }

  const selectUserInDB = await userDao.getUserByEmail(email);

  if (selectUserInDB.length === 0) {
    throw HTTPCustomError("INVALID_USER", 400);
  }

  const passwordInDB = selectUserInDB[0].password;
  const isPasswordRight = bcrypt.compareSync(password, passwordInDB);

  if (!isPasswordRight) {
    throw HTTPCustomError("INVALID_USER", 400);
  }

  const hashed = bcrypt.hashSync(newpassword, bcrypt.genSaltSync());

  const updatePassword = await userDao.updatePassword(email, hashed);

  return updatePassword;
};

module.exports = { signUp, login, getUsers, updatePassword };
