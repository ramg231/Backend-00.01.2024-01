const { response, request } = require("express");
const axios = require('axios').default;
const apiClima = 'https://the-weather-api.p.rapidapi.com';

const getWeather = async (req = request, res = response) => {
    const { ciudad } = req.params;

    try {
        const response = await axios.get(`${apiClima}/api/weather/tacna`, {
            headers: {
                'X-RapidAPI-Key': '3bba46ee9emsh9724192b98928afp1410dfjsn352ded5c736a'
            }
        });
        const data = response.data;
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error("Error al obtener el clima:", error.message);
        res.status(500).json({ message: "Error al obtener el clima" });
    }
};

module.exports = {
    getWeather,
};