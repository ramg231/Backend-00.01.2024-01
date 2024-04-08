const { response, request } = require("express");
const axios = require("axios").default;
const apiGithub = "https://api.github.com";

const getUser = async (req = request, res = response) => {
  const { username } = req.params;
  const response = await axios.get(`${apiGithub}/users/${username}`);
  const data = response.data;
  res.json(data);
};

module.exports = {
  getUser,
};
