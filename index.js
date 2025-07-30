//Lightweight server option
//https://nodejs.dev/learn/nodejs-file-paths

const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const controller = require('./controller');

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  let body = "";
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    if (req.method === 'GET') {
      const rPath = req.url.toString().toLowerCase();
      const fileName = path.basename(rPath);
      const jPath = `Posts/${fileName}`;

      // Group index file cases
      if (fileName === "" || fileName === "index" || fileName === "index.html") {
        fs.readFile("Views/index.html", 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end("<h1>Index not found!</h1>");
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
        });
      } else if (fileName === "favicon.ico") {
        fs.readFile("favicon.ico", (err, data) => {
          if (err) {
            console.error(err);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end("<h1>Favicon not found!</h1>");
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'image/x-icon');
          res.end(data);
        });
      } else {
        // all other request types (posts)
        fs.readFile(jPath, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end("<h1>Post not found!</h1>");
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
        });
      }
    } else if (req.method === 'POST') {
      console.log('POSTed: ' + body);
      controller.createPost(body);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('worked!');
    } else {
      console.log('DID NOT WORK!');
      res.statusCode = 405;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Method Not Allowed');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
