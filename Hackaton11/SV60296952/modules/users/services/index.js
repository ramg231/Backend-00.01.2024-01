const User = require("../model/user");

const findAll = async (req, res) => {
  //   console.log(req);
  const result = await User.findAll();
  console.log(result);
  res.send("Hello World!");
};

module.exports = {
  findAll,
};
