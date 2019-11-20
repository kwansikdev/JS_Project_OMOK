// DOMS
// starting-popup
const $startPopup = document.querySelector('.start-popup');
const $player1Name = document.querySelector('.player1-name');
const $player2Name = document.querySelector('.player2-name');
const $bettingList = document.querySelector('.betting-list');
const $startBtn = document.querySelector('.start-button');
const $overlay = document.querySelector('.overlay');
const $bettingContent = document.querySelector('.betting-content');

// player-panel
const $player1Panel = document.querySelector('.player-1-panel');
const $player2Panel = document.querySelector('.player-2-panel');
const $panelName1 = document.querySelector('.player-1-panel > .player-name');
const $panelName2 = document.querySelector('.player-2-panel > .player-name');

// Timer
const $playerTimer1 = document.querySelector('.player-timer1');
const $playerTimer2 = document.querySelector('.player-timer2');

// Ending-popup
const $endingPopup = document.querySelector('.ending-popup');
const $victoryContent = document.querySelector('.victory-content');
const $more = document.querySelector('.more');
const $endingBettingContent = document.querySelector('.ending-betting-content');
const $victoryYes = document.querySelector('.victory-yes');
const $victoryNo = document.querySelector('.victory-no');


//  배열생성
const SIZE = 19;
let state = 1;

let stateArr = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));

const $space = document.querySelector('.space');

// stateArr 배열에서의 값 리턴 (0, 0) 자기위치
const position = (id, x, y) => {
  const [col, row] = id.split(',');
  if (+col + x < 0 || +row + y < 0 || +col + x > 18 || +row + y > 18) {
    return false;
  }
  return stateArr[+col + x][+row + y];
};

const checkRightDiagonal = (id, checkNum) => {
  let count = 1;

  if (checkNum === 5) {
    for (let i = 1; position(id, -i, -i) === state; i++) count++; // 붙어있는 같은 색상들 확인
    for (let i = 1; position(id, i, i) === state; i++) count++;
  } else if (checkNum === 4) { // 4X4 확인
    for (let i = 1; i <= 4; i++) if (position(id, -i, -i) === state && position(id, -1, -1) !== 2) count++; // 왼쪽 위 방향으로 3개가 다 있는 경우
    if (count === 4 && position(id, 1, 1) !== state && ((position(id, -4, -4) !== 2 || position(id, 1, 1) !== 2) && (position(id, -5, -5) !== 2 || position(id, 1, 1) !== 2))) return true;
    count = 1;
    for (let i = 1; i <= 4; i++) if (position(id, i, i) === state && position(id, 1, 1) !== 2) count++; // 오른쪽 아래 방향에 3개가 다 있는 경우
    if (count === 4 && position(id, -1, -1) !== state && ((position(id, 4, 4) !== 2 || position(id, -1, -1) !== 2) && (position(id, 5, 5) !== 2 || position(id, -1, -1) !== 2))) return true;
    else if (position(id, -1, -1) !== state && position(id, 1, 1) !== state) return false; // 양쪽이 비었을 경우 안된다.
    else if (position(id, -1, -1) === state && position(id, 1, 1) === state) { // 양쪽이 둘다 차있을 경우
      if (position(id, -2, -2) === state && (position(id, -3, -3) !== 2 || position(id, 2, 2) !== 2) && position(id, -3, -3) !== state && position(id, 2, 2) !== state) return true;
      else if (position(id, -2, -2) === 0 && position(id, -3, -3) === state && (position(id, -4, -4) !== 2 || position(id, 2, 2) !== 2) && position(id, -4, -4) !== state && position(id, 2, 2) !== state) return true;
      else if (position(id, 2, 2) === state && (position(id, 3, 3) !== 2 || position(id, -2, -2) !== 2) && position(id, 3, 3) !== state && position(id, -2, -2) !== state) return true;
      else if (position(id, 2, 2) === 0 && position(id, 3, 3) === state && (position(id, 4, 4) !== 2 || position(id, -2, -2) !== 2) && position(id, 4, 4) !== state && position(id, -2, -2) !== state) return true;
    } else if (position(id, -1, -1) !== state) { // 왼쪽 위 방향이 비었을 경우
      if (position(id, -2, -2) !== state) return false; // 다음껀 무조건 차있어야한다.
      if (position(id, 1, 1) === state && position(id, -3, -3) === state && (position(id, 2, 2) !== 2 || position(id, -4, -4) !== 2) && position(id, 2, 2) !== state && position(id, -4, -4) !== state) return true;
      else if (position(id, 1, 1) === state && position(id, 2, 2) === state && (position(id, -1, -1) !== 2 || position(id, 3, 3) !== 2) && position(id, -1, -1) !== state && position(id, 3, 3) !== state) return true;
      else return false;
    } else { // 오른쪽 아래 방향이 비었을 경우
      if (position(id, 2, 2) !== state) return false; // 다음껀 무조건 차있어야한다.
      if (position(id, -1, -1) === state && position(id, 3, 3) === state && (position(id, -2, -2) !== 2 || position(id, 4, 4) !== 2) && position(id, -2, -2) !== state && position(id, 4, 4) !== state) return true;
      else if (position(id, -1, -1) === state && position(id, -2, -2) === state && (position(id, 1, 1) !== 2 || position(id, -3, -3) !== 2) && position(id, 1, 1) !== state && position(id, -3, -3) !== state) return true;
      else return false;
    }
  } else { // 3X3 확인
    // 왼쪽 위 방향에 2개가 다 있는 경우
    if (position(id, -1, -1) === state && position(id, -2, -2) === state && position(id, 1, 1) === 0 && position(id, -3, -3) === 0 && (position(id, 2, 2) !== 2 || position(id, -4, -4) !== 2) && position(id, 2, 2) !== state && position(id, -4, -4) !== state) return true;
    else if (position(id, -1, -1) === 0 && position(id, -2, -2) === state && position(id, -3, -3) === state && position(id, 1, 1) === 0 && position(id, -4, -4) === 0) return true;
    // 오른쪽 아래 방향에 2개가 다 있는 경우
    else if (position(id, 1, 1) === state && position(id, 2, 2) === state && position(id, -1, -1) === 0 && position(id, 3, 3) === 0 && (position(id, -2, -2) !== 2 || position(id, 4, 4) !== 2) && position(id, -2, -2) !== state && position(id, 4, 4) !== state) return true;
    else if (position(id, 1, 1) === 0 && position(id, 2, 2) === state && position(id, 3, 3) === state && position(id, -1, -1) === 0 && position(id, 4, 4) === 0) return true;
    for (let i = 1; i <= 3; i++) if (position(id, i, i) === state && position(id, 1, 1) === 0) count++;
    if (count === 3 && position(id, -1, -1) !== state && ((position(id, 3, 3) === 0 && position(id, -1, -1) === 0) && (position(id, 4, 4) === 0 && position(id, -1, -1) === 0))) return true;
    else if (position(id, -1, -1) !== state && position(id, 1, 1) !== state) return false; // 양쪽이 비었을 경우 안된다.
    else if (position(id, -1, -1) === state && position(id, 1, 1) === state && position(id, -2, -2) === 0 && position(id, 2, 2) === 0 && (position(id, -3, -3) !== 2 || position(id, 3, 3) !== 2) && position(id, -3, -3) !== state && position(id, 3, 3) !== state) return true; // 양쪽이 둘다 차있을 경우
    else if (position(id, -1, -1) !== state && position(id, -2, -2) === state && position(id, 1, 1) === state && position(id, -3, -3) === 0 && position(id, 2, 2) === 0) return true; // 왼쪽 위 방향이 비었을 경우
    else if (position(id, 1, 1) !== state && position(id, 2, 2) === state && position(id, -1, -1) === state && position(id, 3, 3) === 0 && position(id, -2, -2) === 0) return true; // 오른쪽 아래 방향이 비었을 경우
  }
  return count;
};

const checkLeftDiagonal = (id, checkNum) => {
  let count = 1;

  if (checkNum === 5) {
    for (let i = 1; position(id, i, -i) === state; i++) count++; // 붙어있는 같은 색상들 확인
    for (let i = 1; position(id, -i, i) === state; i++) count++;
  } else if (checkNum === 4) { // 4X4 확인
    for (let i = 1; i <= 4; i++) if (position(id, i, -i) === state && position(id, 1, -1) !== 2) count++; // 왼쪽 아래 방향으로 3개가 다 있는 경우
    if (count === 4 && position(id, -1, 1) !== state && ((position(id, 4, -4) !== 2 || position(id, -1, 1) !== 2) && (position(id, 5, -5) !== 2 || position(id, 1, 1) !== 2))) return true;
    count = 1;
    for (let i = 1; i <= 4; i++) if (position(id, -i, i) === state && position(id, 1, 1) !== 2) count++; // 오른쪽 위 방향에 3개가 다 있는 경우
    if (count === 4 && position(id, 1, -1) !== state && ((position(id, -4, 4) !== 2 || position(id, 1, -1) !== 2) && (position(id, -5, 5) !== 2 || position(id, -1, -1) !== 2))) return true;
    else if (position(id, 1, -1) !== state && position(id, -1, 1) !== state) return false; // 양쪽이 비었을 경우 안된다.
    else if (position(id, 1, -1) === state && position(id, -1, 1) === state) { // 양쪽이 둘다 차있을 경우
      if (position(id, 2, -2) === state && (position(id, 3, -3) !== 2 || position(id, -2, 2) !== 2) && position(id, 3, -3) !== state && position(id, -2, 2) !== state) return true;
      else if (position(id, 2, -2) === 0 && position(id, 3, -3) === state && (position(id, 4, -4) !== 2 || position(id, -2, 2) !== 2) && position(id, 3, -3) !== state && position(id, 4, -4) !== state) return true;
      else if (position(id, -2, 2) === state && (position(id, -3, 3) !== 2 || position(id, 2, -2) !== 2) && position(id, -3, 3) !== state && position(id, 2, -2) !== state) return true;
      else if (position(id, -2, 2) === 0 && position(id, -3, 3) === state && (position(id, -4, 4) !== 2 || position(id, 2, -2) !== 2) && position(id, -4, 4) !== state && position(id, 2, -2) !== state) return true;
    } else if (position(id, 1, -1) !== state) { // 왼쪽 아래 방향이 비었을 경우
      if (position(id, 2, -2) !== state) return false; // 다음껀 무조건 차있어야한다.
      if (position(id, -1, 1) === state && position(id, 3, -3) === state && (position(id, -2, 2) !== 2 || position(id, 4, -4) !== 2) && position(id, -2, 2) !== state && position(id, 4, -4) !== state) return true;
      else if (position(id, -1, 1) === state && position(id, -2, 2) === state && (position(id, 1, -1) !== 2 || position(id, -3, 3) !== 2) && position(id, 1, -1) !== state && position(id, -3, 3) !== state) return true;
      else return false;
    } else { // 오른쪽 위 방향이 비었을 경우
      if (position(id, -2, 2) !== state) return false; // 다음껀 무조건 차있어야한다.
      if (position(id, 1, -1) === state && position(id, -3, 3) === state && (position(id, 2, -2) !== 2 || position(id, -4, 4) !== 2) && position(id, 2, -2) !== state && position(id, -4, 4) !== state) return true;
      else if (position(id, 1, -1) === state && position(id, 2, -2) === state && (position(id, -1, 1) !== 2 || position(id, 3, -3) !== 2) && position(id, -1, 1) !== state && position(id, 3, -3) !== state) return true;
      else return false;
    }
  } else { // 3X3 확인
    // 왼쪽 아래 방향에 2개가 다 있는 경우
    if (position(id, 1, -1) === state && position(id, 2, -2) === state && position(id, -1, 1) === 0 && position(id, 3, -3) === 0 && (position(id, -2, 2) !== 2 || position(id, 4, -4) !== 2) && position(id, -2, 2) !== state && position(id, 4, -4) !== state) return true;
    else if (position(id, 1, -1) === 0 && position(id, 2, -2) === state && position(id, 3, -3) === state && position(id, -1, 1) === 0 && position(id, 4, -4) === 0) return true;
    // 오른쪽 위 방향에 2개가 다 있는 경우
    else if (position(id, -1, 1) === state && position(id, -2, 2) === state && position(id, 1, -1) === 0 && position(id, -3, 3) === 0 && (position(id, 2, -2) !== 2 || position(id, -4, 4) !== 2) && position(id, 2, -2) !== state && position(id, -4, 4) !== state) return true;
    else if (position(id, -1, 1) === 0 && position(id, -2, 2) === state && position(id, -3, 3) === state && position(id, 1, -1) === 0 && position(id, -4, 4) === 0) return true;
    for (let i = 1; i <= 3; i++) if (position(id, -i, i) === state && position(id, -1, 1) === 0) count++;
    if (count === 3 && position(id, 1, -1) !== state && ((position(id, -3, 3) === 0 && position(id, 1, -1) === 0) && (position(id, -4, 4) === 0 && position(id, 1, -1) === 0))) return true;
    else if (position(id, 1, -1) !== state && position(id, -1, 1) !== state) return false; // 양쪽이 비었을 경우 안된다.
    else if (position(id, 1, -1) === state && position(id, -1, 1) === state && position(id, 2, -2) === 0 && position(id, -2, 2) === 0 && (position(id, 3, -3) !== 2 || position(id, -3, 3) !== 2) && position(id, 3, -3) !== state && position(id, -3, 3) !== state) return true; // 양쪽이 둘다 차있을 경우
    else if (position(id, 1, -1) !== state && position(id, 2, -2) === state && position(id, -1, 1) === state && position(id, 3, -3) === 0 && position(id, -2, 2) === 0) return true; // 왼쪽 아래 방향이 비었을 경우
    else if (position(id, -1, 1) !== state && position(id, -2, 2) === state && position(id, 1, -1) === state && position(id, -3, 3) === 0 && position(id, 2, -2) === 0) return true; // 오른쪽 위 방향이 비었을 경우
  }
  return count;
};

const checkHorizon = (id, checkNum) => {
  let count = 1;

  if (checkNum === 5) {
    for (let i = 1; position(id, 0, -i) === state; i++) count++; // 붙어있는 같은 색상들 확인
    for (let i = 1; position(id, 0, i) === state; i++) count++;
  } else if (checkNum === 4) { // 4X4 확인
    for (let i = 1; i <= 4; i++) if (position(id, 0, -i) === state && position(id, 0, -1) !== 2) count++; // 왼쪽 방향으로 3개가 다 있는 경우
    if (count === 4 && position(id, 0, 1) !== state && ((position(id, 0, -4) !== 2 || position(id, 0, 1) !== 2) && (position(id, 0, -5) !== 2 || position(id, 0, 1) !== 2))) return true;
    count = 1;
    for (let i = 1; i <= 4; i++) if (position(id, 0, i) === state && position(id, 0, 1) !== 2) count++; // 오른쪽 방향에 3개가 다 있는 경우
    if (count === 4 && position(id, 0, -1) !== state && ((position(id, 0, 4) !== 2 || position(id, 0, -1) !== 2) && (position(id, 0, 5) !== 2 || position(id, 0, -1) !== 2))) return true;
    else if (position(id, 0, -1) !== state && position(id, 0, 1) !== state) return false; // 양쪽이 비었을 경우 안된다.
    else if (position(id, 0, -1) === state && position(id, 0, 1) === state) { // 양쪽이 둘다 차있을 경우
      if (position(id, 0, -2) === state && (position(id, 0, -3) !== 2 || position(id, 0, 2) !== 2) && position(id, 0, -3) !== state && position(id, 0, 2) !== state) return true;
      else if (position(id, 0, -2) === 0 && position(id, 0, -3) === state && (position(id, 0, -4) !== 2 || position(id, 0, 2) !== 2) && position(id, 0, -4) !== state && position(id, 0, 2) !== state) return true;
      else if (position(id, 0, 2) === state && (position(id, 0, 3) !== 2 || position(id, 0, -2) !== 2) && position(id, 0, 3) !== state && position(id, 0, -2) !== state) return true;
      else if (position(id, 0, 2) === 0 && position(id, 0, 3) === state && (position(id, 0, 4) !== 2 || position(id, 0, -2) !== 2) && position(id, 0, 4) !== state && position(id, 0, -2) !== state) return true;
    } else if (position(id, 0, -1) !== state) { // 왼쪽 방향이 비었을 경우
      if (position(id, 0, -2) !== state) return false; // 다음껀 무조건 차있어야한다.
      if (position(id, 0, 1) === state && position(id, 0, -3) === state && (position(id, 0, 2) !== 2 || position(id, 0, -4) !== 2) && position(id, 0, 2) !== state && position(id, 0, -4) !== state) return true;
      else if (position(id, 0, 1) === state && position(id, 0, 2) === state && (position(id, 0, -1) !== 2 || position(id, 0, 3) !== 2) && position(id, 0, -1) !== state && position(id, 0, 3) !== state) return true;
      else return false;
    } else { // 오른쪽 방향이 비었을 경우
      if (position(id, 0, 2) !== state) return false; // 다음껀 무조건 차있어야한다.
      if (position(id, 0, -1) === state && position(id, 0, 3) === state && (position(id, 0, -2) !== 2 || position(id, 0, 4) !== 2) && position(id, 0, -2) !== state && position(id, 0, 4) !== state) return true;
      else if (position(id, 0, -1) === state && position(id, 0, -2) === state && (position(id, 0, 1) !== 2 || position(id, 0, -3) !== 2) && position(id, 0, 1) !== state && position(id, 0, -3) !== state) return true;
      else return false;
    }
  } else { // 3X3 확인
    // 왼쪽 방향에 2개가 다 있는 경우
    if (position(id, 0, -1) === state && position(id, 0, -2) === state && position(id, 0, 1) === 0 && position(id, 0, -3) === 0 && (position(id, 0, 2) !== 2 || position(id, 0, -4) !== 2) && position(id, 0, 2) !== state && position(id, 0, -4) !== state) return true;
    else if (position(id, 0, -1) === 0 && position(id, 0, -2) === state && position(id, 0, -3) === state && position(id, 0, 1) === 0 && position(id, 0, -4) === 0) return true;
    // 오른쪽 방향에 2개가 다 있는 경우
    else if (position(id, 0, 1) === state && position(id, 0, 2) === state && position(id, 0, -1) === 0 && position(id, 0, 3) === 0 && (position(id, 0, -2) !== 2 || position(id, 0, 4) !== 2) && position(id, 0, -2) !== state && position(id, 0, 4) !== state) return true;
    else if (position(id, 0, 1) === 0 && position(id, 0, 2) === state && position(id, 0, 3) === state && position(id, 0, -1) === 0 && position(id, 0, 4) === 0) return true;
    for (let i = 1; i <= 3; i++) if (position(id, 0, i) === state && position(id, 0, 1) === 0) count++;
    if (count === 3 && position(id, 0, -1) !== state && ((position(id, 0, 3) === 0 && position(id, 0, -1) === 0) && (position(id, 0, 4) === 0 && position(id, 0, -1) === 0))) return true;
    else if (position(id, 0, -1) !== state && position(id, 0, 1) !== state) return false; // 양쪽이 비었을 경우 안된다.
    else if (position(id, 0, -1) === state && position(id, 0, 1) === state && position(id, 0, -2) === 0 && position(id, 0, 2) === 0 && (position(id, 0, -3) !== 2 || position(id, 0, 3) !== 2) && position(id, 0, -3) !== state && position(id, 0, 3) !== state) return true; // 양쪽이 둘다 차있을 경우
    else if (position(id, 0, -1) !== state && position(id, 0, -2) === state && position(id, 0, 1) === state && position(id, 0, -3) === 0 && position(id, 0, 2) === 0) return true; // 왼쪽 방향이 비었을 경우
    else if (position(id, 0, 1) !== state && position(id, 0, 2) === state && position(id, 0, -1) === state && position(id, 0, 3) === 0 && position(id, 0, -2) === 0) return true; // 오른쪽 방향이 비었을 경우
  }
  return count;
};

const checkVertical = (id, checkNum) => {
  let count = 1;

  if (checkNum === 5) {
    for (let i = 1; position(id, -i, 0) === state; i++) count++; // 붙어있는 같은 색상들 확인
    for (let i = 1; position(id, i, 0) === state; i++) count++;
  } else if (checkNum === 4) { // 4X4 확인
    for (let i = 1; i <= 4; i++) if (position(id, -i, 0) === state && position(id, -1, 0) !== 2) count++; // 위 방향으로 3개가 다 있는 경우
    if (count === 4 && position(id, 1, 0) !== state && ((position(id, -4, 0) !== 2 || position(id, 1, 0) !== 2) && (position(id, -5, 0) !== 2 || position(id, 1, 0) !== 2))) return true;
    count = 1;
    for (let i = 1; i <= 4; i++) if (position(id, i, 0) === state && position(id, 1, 0) !== 2) count++; // 아래 방향에 3개가 다 있는 경우
    if (count === 4 && position(id, -1, 0) !== state && ((position(id, 4, 0) !== 2 || position(id, -1, 0) !== 2) && (position(id, 5, 0) !== 2 || position(id, -1, 0) !== 2))) return true;
    else if (position(id, -1, 0) !== state && position(id, 1, 0) !== state) return false; // 양쪽이 비었을 경우 안된다.
    else if (position(id, -1, 0) === state && position(id, 1, 0) === state) { // 양쪽이 둘다 차있을 경우
      if (position(id, -2, 0) === state && (position(id, -3, 0) !== 2 || position(id, 2, 0) !== 2) && position(id, -3, 0) !== state && position(id, 2, 0) !== state) return true;
      else if (position(id, -2, 0) === 0 && position(id, -3, 0) === state && (position(id, -4, 0) !== 2 || position(id, 2, 0) !== 2) && position(id, -4, 0) !== state && position(id, 2, 0) !== state) return true;
      else if (position(id, 2, 0) === state && (position(id, 3, 0) !== 2 || position(id, -2, 0) !== 2) && position(id, 3, 0) !== state && position(id, -2, 0) !== state) return true;
      else if (position(id, 2, 0) === 0 && position(id, 3, 0) === state && (position(id, 4, 0) !== 2 || position(id, -2, 0) !== 2) && position(id, 4, 0) !== state && position(id, -2, 0) !== state) return true;
    } else if (position(id, -1, 0) !== state) { // 위 방향이 비었을 경우
      if (position(id, -2, 0) !== state) return false; // 다음껀 무조건 차있어야한다.
      if (position(id, 1, 0) === state && position(id, -3, 0) === state && (position(id, 2, 0) !== 2 || position(id, -4, 0) !== 2) && position(id, 2, 0) !== state && position(id, -4, 0) !== state) return true;
      else if (position(id, 1, 0) === state && position(id, 2, 0) === state && (position(id, -1, 0) !== 2 || position(id, 3, 0) !== 2) && position(id, -1, 0) !== state && position(id, 3, 0) !== state) return true;
      else return false;
    } else { // 아래 방향이 비었을 경우
      if (position(id, 2, 0) !== state) return false; // 다음껀 무조건 차있어야한다.
      if (position(id, -1, 0) === state && position(id, 3, 0) === state && (position(id, -2, 0) !== 2 || position(id, 4, 0) !== 2) && position(id, -2, 0) !== state && position(id, 4, 0) !== state) return true;
      else if (position(id, -1, 0) === state && position(id, -2, 0) === state && (position(id, 1, 0) !== 2 || position(id, -3, 0) !== 2) && position(id, 1, 0) !== state && position(id, -3, 0) !== state) return true;
      else return false;
    }
  } else { // 3X3 확인
    // 위 방향에 2개가 다 있는 경우
    if (position(id, -1, 0) === state && position(id, -2, 0) === state && position(id, 1, 0) === 0 && position(id, -3, 0) === 0 && (position(id, 2, 0) !== 2 || position(id, -4, 0) !== 2) && position(id, 2, 0) !== state && position(id, -4, 0) !== state) return true;
    else if (position(id, -1, 0) === 0 && position(id, -2, 0) === state && position(id, -3, 0) === state && position(id, 1, 0) === 0 && position(id, -4, 0) === 0) return true;
    // 아래 방향에 2개가 다 있는 경우
    else if (position(id, 1, 0) === state && position(id, 2, 0) === state && position(id, -1, 0) === 0 && position(id, 3, 0) === 0 && (position(id, -2, 0) !== 2 || position(id, 4, 0) !== 2) && position(id, -2, 0) !== state && position(id, 4, 0) !== state) return true;
    else if (position(id, 1, 0) === 0 && position(id, 2, 0) === state && position(id, 3, 0) === state && position(id, -1, 0) === 0 && position(id, 4, 0) === 0) return true;
    for (let i = 1; i <= 3; i++) if (position(id, i, 0) === state && position(id, 1, 0) === 0) count++;
    if (count === 3 && position(id, -1, 0) !== state && ((position(id, 3, 0) === 0 && position(id, -1, 0) === 0) && (position(id, 4, 0) === 0 && position(id, -1, 0) === 0))) return true;
    else if (position(id, -1, 0) !== state && position(id, 1, 0) !== state) return false; // 양쪽이 비었을 경우 안된다.
    else if (position(id, -1, 0) === state && position(id, 1, 0) === state && position(id, -2, 0) === 0 && position(id, 2, 0) === 0 && (position(id, -3, 0) !== 2 || position(id, 3, 0) !== 2) && position(id, -3, 0) !== state && position(id, 3, 0) !== state) return true; // 양쪽이 둘다 차있을 경우
    else if (position(id, -1, 0) !== state && position(id, -2, 0) === state && position(id, 1, 0) === state && position(id, -3, 0) === 0 && position(id, 2, 0) === 0) return true; // 위 방향이 비었을 경우
    else if (position(id, 1, 0) !== state && position(id, 2, 0) === state && position(id, -1, 0) === state && position(id, 3, 0) === 0 && position(id, -2, 0) === 0) return true; // 아래 방향이 비었을 경우
  }
  return count;
};

const checkNone = (id) => {
  const [row, col] = id.split(',');
  let checkArr = [];
  // 3x3 확인
  checkArr.push(checkRightDiagonal(id, 3));
  checkArr.push(checkLeftDiagonal(id, 3));
  checkArr.push(checkHorizon(id, 3));
  checkArr.push(checkVertical(id, 3));

  const checkNum3 = checkArr.reduce((pre, cur) => {
    if (cur === true) pre++;
    return pre;
  }, 0);

  // 4X4 확인
  checkArr = [];
  checkArr.push(checkRightDiagonal(id, 4));
  checkArr.push(checkLeftDiagonal(id, 4));
  checkArr.push(checkHorizon(id, 4));
  checkArr.push(checkVertical(id, 4));

  const checkNum4 = checkArr.reduce((pre, cur) => {
    if (cur === true) pre++;
    return pre;
  }, 0);
  if (checkNum3 >= 2) { stateArr[row][col] = 3; return 1; }
  if (checkNum4 >= 2) { stateArr[row][col] = 4; return 2; }
};

// stateArr 배열을 그리는 함수
const render = () => {
  if (state === 1) {
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        if (position(`${i},${j}`, 0, 0) === 0) checkNone(`${i},${j}`);
      }
    }
  } else {
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        if (stateArr[i][j] === 3 || stateArr[i][j] === 4) stateArr[i][j] = 0;
      }
    }
  }

  let html = '';
  stateArr.forEach((col, colSelf) => {
    html += '<tr>';
    col.forEach((row, rowSelf) => {
      if (row === 0) html += `<td class="space-box" id="${colSelf},${rowSelf}"></td>`;
      else if (row === 1) html += `<td class="space-box" id="${colSelf},${rowSelf}"><div class="black-circle"></div></td>`;
      else if (row === 2) html += `<td class="space-box" id="${colSelf},${rowSelf}"><div class="white-circle"></div></td>`;
      else if (row === 3) html += `<td class="space-box" id="${colSelf},${rowSelf}"><div class="x-block"><i class="fas fa-times"></i></div></td>`;
      else html += `<td class="space-box" id="${colSelf},${rowSelf}"><div class="x-block"><i class="fas fa-times"></i></div></td>`;
    });
    html += '</tr>';
  });
  $space.innerHTML = html;
};

const endingPopup = () => {
  $endingPopup.style.visibility = 'visible';
  if (state === 1) {
    $victoryContent.innerHTML = `${$panelName1.textContent}가(이) 이겼닭!`;
    $more.innerHTML = `${$panelName1.textContent} , ${$panelName2.textContent} 한판 더?`;
  } else {
    $victoryContent.innerHTML = `${$panelName2.textContent}가(이) 이겼닭!`;
    $more.innerHTML = `${$panelName1.textContent} , ${$panelName2.textContent} 한판 더?`;
  }
};

// Timer
const timerCloser = (() => {
  let player1TimeId = 0;
  let player2TimeId = 0;

  const timer1 = () => {
    $playerTimer1.innerHTML -= 1;
    if ($playerTimer1.textContent === '0') {
      clearInterval(player1TimeId);
    }
  };
  const timer2 = () => {
    $playerTimer2.innerHTML -= 1;
    if ($playerTimer2.textContent === '0') {
      clearInterval(player2TimeId);
    }
  };

  return {
    timer1() {
      clearInterval(player2TimeId);
      $playerTimer1.innerHTML = 30;
      player1TimeId = setInterval(timer1, 500);
    },
    timer2() {
      clearInterval(player1TimeId);
      $playerTimer2.innerHTML = 30;
      player2TimeId = setInterval(timer2, 500);
    },
    stopTimer() {
      clearInterval(player1TimeId);
      clearInterval(player2TimeId);
    }
  };
})();

// 턴 활성화
function active() {
  $player2Panel.classList.toggle('active');
  $player1Panel.classList.toggle('active');
  if (state === 1) timerCloser.timer1();
  else timerCloser.timer2();
}

const checkVictory = (id) => {
  const checkArr = []; // 동시에 5가 2개가 되었을 때 하나만 출력해주기 위해 배열에 넣어주었음
  checkArr.push(checkRightDiagonal(id, 5));
  checkArr.push(checkLeftDiagonal(id, 5));
  checkArr.push(checkHorizon(id, 5));
  checkArr.push(checkVertical(id, 5));

  if (checkArr.indexOf(5) !== -1) {
    if (state === 2) {
      $player2Panel.classList.toggle('active');
      $player1Panel.classList.toggle('active');
    } else {
      $player2Panel.classList.toggle('active');
      $player1Panel.classList.toggle('active');
    }

    return endingPopup();
  }
};

$space.onclick = ({ target }) => {
  const [row, col] = target.id.split(',');
  if (!target.classList.contains('space-box') || target.innerHTML) return;

  if (state === 1) {
    if (checkNone(target.id) === 1) {
      stateArr[row][col] = 3;
      return;
    }
    if (checkNone(target.id) === 2) {
      stateArr[row][col] = 4;
      return;
    }
    checkVictory(target.id);
    stateArr[row][col] = 1;
    state = 2;
  } else {
    checkVictory(target.id);
    stateArr[row][col] = 2;
    state = 1;
  }
  active();
  render();
};

// POPUP UI
const popupclose = () => {
  $startPopup.style.display = 'none';
  $overlay.style.display = 'none';
};

const inputName = () => {
  const player1Name = $player1Name.value.trim();
  const player2Name = $player2Name.value.trim();
  const bettingContent = $bettingList.value.trim();

  $panelName1.textContent = player1Name;
  $panelName2.textContent = player2Name;
  $bettingContent.textContent = bettingContent;
  $player2Panel.classList.add('active');
};

$startBtn.onclick = () => {
  if (!$player1Name.value.trim() || !$player2Name.value.trim()) return;
  popupclose();
  inputName();
  active();
};

$bettingList.onkeyup = ({keyCode}) => {
  if (keyCode !== 13 || !$bettingList.value.trim()) return;
  popupclose();
  inputName();
  active();
};

function init() {
  window.location.reload();
}

function restart() {
  stateArr = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));

  $endingPopup.style.visibility = "hidden";
  $bettingContent.textContent = $endingBettingContent.value.trim();

  let name1 = '';
  let name2 = '';

  name1 = $panelName1.textContent;
  name2 = $panelName2.textContent;

  $endingPopup.style.visibility = 'hidden';
  $panelName2.textContent = name1;
  $panelName1.textContent = name2

  if (state === 1) {
    $player2Panel.classList.toggle('active');
    $player1Panel.classList.toggle('active');
  }
  state = 1;
  render();
}

window.onload = render;
$victoryNo.addEventListener('click', init);
$victoryYes.addEventListener('click', restart);
document.querySelector('.btn-new').addEventListener('click', init);
