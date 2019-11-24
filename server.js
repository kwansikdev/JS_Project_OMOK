const express = require('express');

const app = express();
let gameRecord = [
  { order: 1, winner: '정수지', loser: '오형근', betting: '아메리카노' },
  { order: 2, winner: '박홍빈', loser: '김준혁', betting: '꿀밤 한 대' },
  { order: 3, winner: '권은비', loser: '김관식', betting: '만원빵' }
];

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json

app.get('/gameRecord', (req, res) => {
  res.send(gameRecord);
});

app.post('/gameRecord', (req, res) => {
  console.log(req.body);
  if (req.body.betting === '') req.body.betting = '내기 없음';
  gameRecord = [...gameRecord, req.body];
  res.send(gameRecord);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
