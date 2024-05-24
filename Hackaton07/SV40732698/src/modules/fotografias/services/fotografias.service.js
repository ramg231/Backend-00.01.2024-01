const { response, request } = require("express");
const axios = require('axios').default;
const apiFoto = 'https://api.pexels.com/v1/';

const getPhoto = async (req = request, res = response) => {
    const { theme } = req.params;

    try {
        const response = await axios.get(`${apiFoto}/search?query=${theme}&per_page=1`, {
            headers: {
                Authorization: '1DryFgbZpD0aUzyVopmCx3823x4ERtQ9bl0BG60YTRgxR98gZaSZeicX'
            }
        });
        const data = response.data;
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error("Error al obtener fotografía:", error.message);
        res.status(500).json({ message: "Error al obtener fotografía, no se encontró un tema" });
    }
};

module.exports = {
    getPhoto,
};