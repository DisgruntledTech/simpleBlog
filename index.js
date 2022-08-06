//Lightweight server option
//https://nodejs.dev/learn/nodejs-file-paths

const http = require('http')
const path = require('path');
const fs = require('fs');
const controller = require('./controller')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  //console.log(req.headers)
  //console.log(req.headers.cookie)
  //const responcedoc = controller.index();
  switch(path.basename){
    case "":
      //do something
      break;
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html',)
  
  fs.readFile("./Views/index.html", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
      data = data.replace("<p>blog loop</p>","Worked");
      res.end(data);      
    });    
  
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})