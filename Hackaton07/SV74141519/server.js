const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname))); // Sirve archivos estáticos

app.get('/buscar', async (req, res) => {
    const { username } = req.query;
    const url = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener datos: ${response.statusText}`);
        }
        const datosUsuario = await response.json();
        res.json(datosUsuario);
    } catch (error) {
        console.error('Error al consultar los datos de GitHub:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});