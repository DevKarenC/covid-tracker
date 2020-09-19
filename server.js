const express = require('express'); // npm packages
const fetch = require('node-fetch'); // fetch package
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
require('dotenv').config();

console.log(process.env);

const app = express(); // create express server

app.use(favicon(`${__dirname}/build/favicon.ico`));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/version', function (req, res) {
  // version release purposes
  return res.send('v1.1');
});

app.get('/api', async (request, response) => {
  const apiKey = process.env.API_KEY;

  const currentDataUrl = 'https://api.covidtracking.com/v1/states/current.json';
  const currentDataResponse = await fetch(currentDataUrl);
  const currentData = await currentDataResponse.json();

  const stateHistoricalDataUrl =
    'https://api.covidtracking.com/v1/states/daily.json';
  const stateHistoricalDataResponse = await fetch(stateHistoricalDataUrl);
  const stateHistoricalData = await stateHistoricalDataResponse.json();

  const usHistoricalDataUrl = 'https://api.covidtracking.com/v1/us/daily.json';
  const usHistoricalDataResponse = await fetch(usHistoricalDataUrl);
  const usHistoricalData = await usHistoricalDataResponse.json();

  const usCurrentDataUrl = 'https://api.covidtracking.com/v1/us/current.json';
  const usCurrentDataResponse = await fetch(usCurrentDataUrl);
  const usCurrentData = await usCurrentDataResponse.json();

  const censusUrl = `https://api.census.gov/data/2019/pep/population?get=POP&for=state:*&key=${apiKey}`;
  const censusResponse = await fetch(censusUrl);
  const censusData = await censusResponse.json();

  const apiData = [
    currentData,
    stateHistoricalData,
    usHistoricalData,
    usCurrentData,
    censusData,
  ];
  // console.log(apiData);
  // console.log(response.json(apiData));
  response.json(apiData);
});

app.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port); // command to run the server
