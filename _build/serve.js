/*
 * serve.js — servidor estático para ver el sitio en local.
 *
 *     node _build/serve.js          (puerto 4173)
 *     node _build/serve.js 8080     (otro puerto)
 *
 * Solo sirve para previsualizar. En producción la carpeta se sube tal cual a
 * cualquier hosting: no hace falta Node ni nada parecido.
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const RAIZ = path.join(__dirname, '..');
const PUERTO = Number(process.argv[2]) || 4173;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const servidor = http.createServer(function (req, res) {
  let ruta = decodeURIComponent(url.parse(req.url).pathname);
  if (ruta.endsWith('/')) ruta += 'index.html';

  const destino = path.join(RAIZ, ruta);

  /* Nadie puede salirse de la carpeta del proyecto. */
  if (destino.indexOf(RAIZ) !== 0) {
    res.writeHead(403);
    res.end('Prohibido');
    return;
  }

  fs.readFile(destino, function (err, datos) {
    if (err) {
      /* Igual que hará el hosting con ErrorDocument: se devuelve 404.html. */
      fs.readFile(path.join(RAIZ, '404.html'), function (err2, error404) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(err2 ? 'No encontrado' : error404);
      });
      return;
    }
    const tipo = TIPOS[path.extname(destino).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': tipo, 'Cache-Control': 'no-cache' });
    res.end(datos);
  });
});

servidor.listen(PUERTO, function () {
  console.log('Tecnicars en http://localhost:' + PUERTO + '/');
  console.log('Ctrl+C para parar.');
});
