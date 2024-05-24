const { response, request } = require("express");
const axios = require('axios').default;
const apiBebida = 'https://www.thecocktaildb.com/api/json/v1/1';

const getBebidas = async (req = request, res = response) => {
    const response = await axios.get(`${apiBebida}/random.php`);
    const data = response.data.drinks[0];
    console.log(data);
    res.json(data);
};

module.exports = {
    getBebidas,
};