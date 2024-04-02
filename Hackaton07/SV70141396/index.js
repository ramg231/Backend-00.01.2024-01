const express =require('express')
const axios =require('axios');
const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/clima',(req,res)=>{
    let ciudad = req.query.ciudad;
    console.log(ciudad);
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://the-weather-api.p.rapidapi.com/api/weather/${ciudad}`,
        headers: { 
            'X-RapidAPI-Key': '73d70d2c28msh7f79106bce6c25ep19a96ajsn943644966186', 
            'X-RapidAPI-Host': 'the-weather-api.p.rapidapi.com'
            }
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.send(JSON.stringify(response.data));
        })
            .catch((error) => {
            console.log(error);
            });
        
});

app.get('/Poderespokespecifico',(req,res)=>{ 
    let pokemon = req.query.pokemon;
    console.log(pokemon);
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://pokeapi.co/api/v2/pokemon/pikachu/',
        headers: { }
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.send(JSON.stringify(response.data));
        })
            .catch((error) => {
            console.log(error);
            });
});

app.get('/detalledecadapersonaje',(req,res)=>{ 
    let character = req.query.caracter;
    console.log(character);
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://rickandmortyapi.com/api/${character}`,
        headers: { }
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.send(JSON.stringify(response.data));
        })
            .catch((error) => {
            console.log(error);
            });
});
    app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
    })