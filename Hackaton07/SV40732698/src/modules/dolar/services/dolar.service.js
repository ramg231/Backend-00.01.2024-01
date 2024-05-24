const { response, request } = require("express");
const axios = require('axios').default;
const apiCambio = 'https://api.frankfurter.app/latest';

const getCambio = async (req = request, res = response) => {
    const { time } = req.params;
    const response = await axios.get(`${apiCambio}`);
    const data = response.data;
    console.log(data)
    res.json(data);
  };

  module.exports = {
    getCambio,
  };