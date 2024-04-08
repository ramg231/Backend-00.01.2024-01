const { request } = require("express");
const User = require("../model/user");

const findAll = async (req, res) => {
  //   console.log(req);
  const result = await User.findAll();
  const formatResult = result.map((users) => users.dataValues);
  res.json(formatResult);
};

const createUser = async (req = request, res = response) => {
  const data = req.body;
  console.log(data);
  const newUser = await User.create(data);

  console.log(newUser.dataValues);
  res.json(newUser.dataValues);
}

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  
  const existUser = await User.findOne({
    where: {
      id,
    },
  });

  if(!existUser){
    return res.status(404).send('User not found');
  }

  const result = await User.destroy({
    where: {
      id,
    },
  })

  console.log(existUser);
  console.log(result);
  res.json(existUser.dataValues);
};

const updateUser = async (req = request, res = response) => {
  const data = req.body;
  const { id } = req.params;

  const existUser = await User.findOne({
    where: {
      id,
    },
  });
  
  if(!existUser){
    return res.status(404).send('User not found');
  }

  const result = await User.update( data, {
    where: {
      id: id,
    }
  });

  console.log(existUser);
  console.log(result);
  res.json(existUser.dataValues);

};

module.exports = {
  findAll,
  createUser,
  deleteUser,
  updateUser,
};
