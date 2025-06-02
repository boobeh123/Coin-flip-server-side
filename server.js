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
        // Define character sets
        const numbers = '0123456789';
        const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const specialChars = '!@#$%^&*_+-?';
        
        // Generate random length between 8 and 16
        const length = Math.floor(Math.random() * 9) + 8;
        
        // Initialize password with at least one character from each set
        let password = '';
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += letters[Math.floor(Math.random() * letters.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
        
        // Fill the rest of the password
        const allChars = numbers + letters + specialChars;
        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // Shuffle the password
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
            status: "success",
            password: password
        }
        res.end(JSON.stringify(objToJson));
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