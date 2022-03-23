const userService = require("../services/userService");
const HTTPCustomError = require("../common/HTTPCustomError");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw HTTPCustomError("KEY_EROR", 400);
    }

    const user = await userService.signUp(email, password);
    res.status(201).json({ message: "SINGUP_SUCCESS", user_id: user.id });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw HTTPCustomError("KEY_EROR", 400);
    }

    const accessToken = await userService.login(email, password);

    return res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    return res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { email, password, newpassword } = req.body;

    if (!email || !password || !newpassword) {
      throw HTTPCustomError("KEY_EROR", 400);
    }

    const updatePassword = await userService.updatePassword(
      email,
      password,
      newpassword
    );
    return res.status(201).json({ message: "UPDATE PASSWORD!" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { signUp, login, getUsers, updatePassword };
