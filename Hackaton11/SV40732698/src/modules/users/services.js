const { request, response } = require("express");

const UserModel = require("./entity");

const create = async (req = request, res = response) => {
  const data = req.body;
  const result = await UserModel.create(data);
  res.status(200).json(result);
};

const findAll = async (req = request, res = response) => {
  const result = await UserModel.findAll();
  res.status(200).json(result);
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await UserModel.findOne({
    where: {
      id
    },
  });

  if (!user) {
    return res.status(404).send("No encontrado");
  }

  await UserModel.destroy({
    where: {
      id
    },
  });

  res.status(200).json(user);
};
module.exports = {
  create,
  findAll,
  deleteUser,
};
