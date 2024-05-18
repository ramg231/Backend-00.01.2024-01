const { request, response } = require("express");

const NacionalidadSchema = require("./entity");

const create = async (req = request, res = response) => {
  const data = req.body;
  const result = await NacionalidadSchema.create(data);
  res.status(200).json(result);
};

const findAll = async (req = request, res = response) => {
  const result = await NacionalidadSchema.findAll();
  res.status(200).json(result);
};

const del = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await NacionalidadSchema.findOne({
    where: {
      id
    },
  });

  if (!user) {
    return res.status(404).send("No encontrado");
  }

  await NacionalidadSchema.destroy({
    where: {
      id
    },
  });

  res.status(200).json(user);
};
module.exports = {
  create,
  findAll,
  del,
};
