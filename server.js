const express = require('express');

const app = express();
let gameRecord = [];

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json

app.get('/gameRecord', (req, res) => {
  res.send(gameRecord);
});

app.post('/gameRecord', (req, res) => {
  console.log(req.body);
  gameRecord = [...gameRecord, req.body];
  res.send(gameRecord);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
