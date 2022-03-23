const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT id, email, password from users WHERE email = ${email};`;
};

const createUser = async (email, hashed) => {
  return await prisma.$queryRaw`
    INSERT INTO users(email, password) VALUES (${email}, ${hashed});
    `;
};

const getUsers = async () => {
  return await prisma.$queryRaw`
  SELECT * FROM USERS;
  `;
};

const updatePassword = async (email, hashed) => {
  return await prisma.$queryRaw`
  UPDATE users SET password = ${hashed} WHERE email = ${email};
  `;
};

module.exports = { getUserByEmail, createUser, getUsers, updatePassword };
