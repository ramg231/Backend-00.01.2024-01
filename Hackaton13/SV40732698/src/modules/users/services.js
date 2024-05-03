const { request, response } = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("./entity");

const create = async (req = request, res = response) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Ingresa todos los campos" });
  }

  const saltBCrypt = Number(process.env.SALT_BCRYPT);
  const salt = bcrypt.genSaltSync(saltBCrypt);
  passwordEncrypted = bcrypt.hashSync(password, salt);
  password = passwordEncrypted;
  const user = await UserModel.create({
    name,
    email,
    password,
  });

  user.save();
  res.json(user);
};

const findOne = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }else
    res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const findAll = async (req = request, res = response) => {
  const result = await UserModel.find();
  res.json(result);
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  let { password, ...user } = req.body;
  try {
    if (password) {
      const saltBCrypt = Number(process.env.SALT_BCRYPT) || 10;
      const salt = bcrypt.genSaltSync(saltBCrypt);
      password = bcrypt.hashSync(password, salt);
      user.password = password;
    }

    const userResult = await UserModel.findByIdAndUpdate(id, user);
    if (!userResult) {
      return res.status(404).json({ message: "El usuario no existe" });
    }
    return res.json(userResult);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create,
  findOne,
  findAll,
  deleteUser,
  update,
};
