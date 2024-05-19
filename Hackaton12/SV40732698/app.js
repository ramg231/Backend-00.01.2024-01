//importar modulos
const http = require("http");
const url = require("url");
const fs = require('fs');

let list = [];

//Creacion de Servidor e identificacion Rutas
const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === '/nuevo' && req.method === 'POST') {
        let body = '';

        req.on('data', (data) => {
            body += data;
       
            const lista = JSON.parse(body);
            list.push({
                nombre: lista.nombre,
                descripcion: lista.descripcion,
                fecha: lista.fecha,
                esCompletado: lista.esCompletado
            });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Registro creado' }));
        });
    } else if (reqUrl.pathname === '/pendientes' && req.method === 'GET') {
        const pendientes = list.filter(lista => !lista.esCompletado);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(pendientes));
    } else if (reqUrl.pathname === '/completados' && req.method === 'GET') {
        const completados = list.filter(lista => lista.esCompletado);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(completados));
    } else  {
        fs.readFile('./index.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});