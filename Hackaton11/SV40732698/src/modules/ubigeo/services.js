const { request, response } = require("express");

const UbigeoSchema = require("./entity");

const create = async (req = request, res = response) => {
  const data = req.body;
  const result = await UbigeoSchema.create(data);
  res.status(200).json(result);
};

const findAll = async (req = request, res = response) => {
  const result = await UbigeoSchema.findAll();
  res.status(200).json(result);
};

const del = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await UbigeoSchema.findOne({
    where: {
      id
    },
  });

  if (!user) {
    return res.status(404).send("No encontrado");
  }

  await UbigeoSchema.destroy({
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
