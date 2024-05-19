const { request, response } = require("express");

const MascotaSchema = require("./entity");

const create = async (req = request, res = response) => {
  const data = req.body;
  const result = await MascotaSchema.create(data);
  res.status(200).json(result);
};

const findAll = async (req = request, res = response) => {
  const result = await MascotaSchema.findAll();
  res.status(200).json(result);
};

const deleteOwner = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await MascotaSchema.findOne({
    where: {
      id
    },
  });

  if (!user) {
    return res.status(404).send("No encontrado");
  }

  await MascotaSchema.destroy({
    where: {
      id
    },
  });

  res.status(200).json(user);
};
module.exports = {
  create,
  findAll,
  deleteOwner,
};
