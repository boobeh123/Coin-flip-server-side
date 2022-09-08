const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');
const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        let flipResult = Math.ceil(Math.random() * 2);
        if (flipResult === 1) {
            const objToJson = {
                coinSide: "heads",
              }
              res.end(JSON.stringify(objToJson));
        } else {
            const objToJson = {
                coinSide: "tails",
              }
              res.end(JSON.stringify(objToJson));
        }
      }
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else {
    figlet('R__U__LOST? 404', (err, result) => {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(result);
      res.end();
    });
  }
});

server.listen(PORT);