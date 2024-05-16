import http from 'node:http'; // Librería del protocolo HTTP
import url from 'node:url'; // Librería para manejo de URLs
import fs from 'node:fs'; // Librería para manejo de archivos

// Ruta al archivo JSON
const filePath = './listSales.json';

// Función para cargar los datos del archivo JSON
const loadSales = () => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Función para guardar los datos en el archivo JSON
const saveSales = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Cargar datos existentes
let listSales = loadSales();

// Creamos un servidor HTTP
http
  .createServer((req, res) => {
    // Parseamos la URL de la solicitud para obtener la ruta
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;

    if (req.method === 'POST' && path === '/create') {
      console.log('Creando...'); // Imprimimos un mensaje en la consola

      let body = ''; // Variable para almacenar el cuerpo de la solicitud

      // Escuchamos los datos de la solicitud
      req.on('data', (chunk) => {
        // Agregamos los datos al cuerpo de la solicitud
        body += chunk.toString();
      });

      // Escuchamos el evento 'end' que indica que se completó la transmisión de datos
      return req.on('end', () => {
        // Parseamos el cuerpo de la solicitud como JSON
        const { name, description, date, completed } = JSON.parse(body);

        // Verificamos si falta algún campo
        if (!name || !description || !date || completed === undefined) {
          res.writeHead(400, { 'Content-type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Faltan Campos...' }));
        } else {
          listSales.push({
            name,
            description,
            date,
            isComplete: completed === 'true',
          });

          // Guardamos la lista actualizada en el archivo JSON
          saveSales(listSales);

          res.writeHead(200, { 'Content-type': 'application/json' });
          return res.end(JSON.stringify(listSales));
        }
      });
    } else if (req.method === 'GET' && path === '/salesComplete') {
      const completedSales = listSales.filter((sale) => sale.isComplete);
      fs.readFile('salesComplete.html', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error interno del servidor');
        }

        const htmlContent = data.replace(
          '<!-- completedSalesList -->',
          `<ul>${completedSales
            .map((sale) => `<li>${sale.name} - ${sale.description}</li>`)
            .join('')}</ul>`
        );

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(htmlContent);
      });
    } else if (req.method === 'GET' && path === '/salesPending') {
      const pendingSales = listSales.filter((sale) => !sale.isComplete);
      fs.readFile('salesPending.html', 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error interno del servidor');
        }

        const htmlContent = data.replace(
          '<!-- pendingSalesList -->',
          `<ul>${pendingSales
            .map((sale) => `<li>${sale.name} - ${sale.description}</li>`)
            .join('')}</ul>`
        );
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(htmlContent);
      });
    } else if (req.method === 'GET' && path === '/create') {
      fs.readFile('create.html', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error interno del servidor');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
    } else if (req.method === 'GET' && path === '/menu') {
      fs.readFile('menu.html', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error interno del servidor');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
    } else if (req.method === 'GET' && path === '/') {
      fs.readFile('index.html', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error interno del servidor');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Recurso no encontrado');
    }
  })
  .listen(8080);
