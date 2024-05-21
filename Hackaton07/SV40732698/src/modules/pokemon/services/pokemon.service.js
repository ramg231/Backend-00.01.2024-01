const expressResponse = require("express").response;
const axios = require('axios').default;
const apiPoke = 'https://pokeapi.co';

const getPokeAbility = async (req, res = expressResponse) => { // Por ahora podemos ver los poderes y curiosidades de los pokemon
    const { name } = req.params;
    const pokeApiResponse = await axios.get(`${apiPoke}/api/v2/pokemon/pikachu/`);
    const data = pokeApiResponse.data;
    //console.log(data);
    res.json(data);
};

module.exports = {
    getPokeAbility,
};