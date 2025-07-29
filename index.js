//Lightweight server option
//https://nodejs.dev/learn/nodejs-file-paths

const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const controller = require('./controller');
const { Console } = require('console');

const hostname = '127.0.0.1'
const port = 3000


const server = http.createServer((req, res) => {
 
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    
    if(req.method === 'GET'){
      const rPath =req.url.toString().toLowerCase();
      const jPath = `Posts/${path.basename(rPath)}`;

      switch(path.basename(rPath)){
        case "":
          fs.readFile("Views/index.html", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html')  
                res.end("<h1>Index not found!</h1>")
            }
              res.statusCode = 200
              res.setHeader('Content-Type', 'text/html')          
              res.end(data);      
            });  
          break;
    
        case "index":
          fs.readFile("Views/index.html", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html')  
                res.end("<h1>Index not found!</h1>")
            }
              res.statusCode = 200
              res.setHeader('Content-Type', 'text/html')
              res.end(data);      
            });  
          break;
    
          case "index.html":
            fs.readFile("Views/index.html", 'utf8', (err, data) => {
              if (err) {
                  console.error(err);
                  res.statusCode = 404
                  res.setHeader('Content-Type', 'text/html')  
                  res.end("<h1>Index not found!</h1>")
              }
                res.statusCode = 200
                res.setHeader('Content-Type', 'text/html')
                res.end(data);      
              });  
            break;
    
        case "favicon.ico":
          fs.readFile("favicon.ico", 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html')  
                res.end("<h1>Index not found!</h1>")
            }
              res.statusCode = 200
              res.setHeader('Content-Type', 'image/x-icon')
              //fs.createReadStream(FAVICON).pipe(res);
              //return;                   
              res.end(data);
            });
          break;
    
        default:
          //all other request types
          fs.readFile(jPath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html')  
                res.end("<h1>Index not found!</h1>")
                return;
            }
              res.statusCode = 200
              res.setHeader('Content-Type', 'utf-8')
              res.end(data);      
            });  
          break;
      }
    }
    else if(req.method === 'POST'){    
      //What is the form name?
      //Pass the form to the controller function
      console.log('POSTed: ' + body);    
      controller.createPost(body);  
      res.end('worked!');
    }
    else{
      Console.log('DID NOT WORK!')
    }
    
  });
      

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
