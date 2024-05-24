const { request, response } = require("express");
const axios = require("axios").default;
const apiRickMorty = "https://rickandmortyapi.com";
const apiKey = ""
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const getRickMorty = async (req = request, res = response) => {
  const response = await axios.get(`${apiRickMorty}/api/character`, {
    httpsAgent: agent,
  });
  const data = response.data;
  console.log(data)
  res.json(data);
};

module.exports = {
  getRickMorty,
};
