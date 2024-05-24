const { response, request } = require("express");
const axios = require('axios').default;
const apiProducts = 'https://fakestoreapi.com';

const getProducts = async (req = request, res = response) => {
    const response = await axios.get(`${apiProducts}/products`);
    const data = response.data;
    console.log(data);
    res.json(data);
};

module.exports = {
    getProducts,
};