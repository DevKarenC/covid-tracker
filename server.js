const express = require('express'); // npm packages
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express(); // create express server
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  // test purposes
  return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port); // command to run the server
