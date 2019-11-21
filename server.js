const express = require('express');

const app = express();
let gameRecode = [];

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json

app.get('/gameRecode', (req, res) => {
  res.send(gameRecode);
});

app.post('/gameRecode', (req, res) => {
  console.log(req.body);
  gameRecode = [...gameRecode, req.body];
  res.send(gameRecode);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
