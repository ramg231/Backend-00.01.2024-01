const { request, response } = require("express");
const bcrypt = require("bcrypt");

const UserModel = require("./user.entity");

const createUser = async (req = request, res = response) => {
  try {
    console.log(req.userAuth);

    const { password } = req.body;

    const data = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const existUser = await UserModel.findOne({
      where: {
        email: data.email,
      },
    });

    if (existUser) {
      return res.status(400).json({
        message: `Usuario con el email:${data.email} ya existe`,
      });
    }

    const newUser = await UserModel.create({ ...data, password: hash });

    res.json({ newUser });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

module.exports = {
  createUser,
};
