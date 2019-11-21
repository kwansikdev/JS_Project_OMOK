const express = require('express');

const app = express();
let gameRecode = [];

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json

app.get('/todos', (req, res) => {
  res.send(gameRecode);
});

app.post('/todos', (req, res) => {
  console.log(req.body);
  gameRecode = [req.body, ...gameRecode];
  res.send(gameRecode);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
