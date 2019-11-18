const SIZE = 19;
let state = 1;

const stateArr = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));

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
  let blockNum = 1;
  if (state === 1) blockNum = 2;
  let count = 1;
  if (checkNum === 5) {
    for (let i = 1; position(id, -i, -i) === state; i++) count++;
    for (let i = 1; position(id, i, i) === state; i++) count++;
  } else {
    if (position(id, 0, 0) === blockNum) return count;
    if (position(id, -1, -1) === blockNum || position(id, 1, 1) === blockNum) return count;
    for (let i = 1; i <= 3; i++) {
      if (i !== 3) if (position(id, -(i + 1), -(i + 1)) === 0 || position(id, -(i + 1), -(i + 1)) === state) if (position(id, -i, -i) === state) count++;
      if (i === 3 && position(id, -i, -i) === state) count++;
    }
    for (let i = 1; i <= 3; i++) {
      if (i !== 3) if (position(id, (i + 1), (i + 1)) === 0 || position(id, (i + 1), (i + 1)) === state) if (position(id, i, i) === state) count++;
      if (i === 3 && position(id, i, i) === state) count++;
    }
  }
  return count;
};

const checkLeftDiagonal = (id, checkNum) => {
  let blockNum = 1;
  if (state === 1) blockNum = 2;
  let count = 1;
  if (checkNum === 5) {
    for (let i = 1; position(id, i, -i) === state; i++) count++;
    for (let i = 1; position(id, -i, i) === state; i++) count++;
  } else {
    if (position(id, 0, 0) === blockNum) return count;
    if (position(id, 1, -1) === blockNum || position(id, -1, 1) === blockNum) return count;
    for (let i = 1; i <= 3; i++) {
      if (i !== 3) if (position(id, (i + 1), -(i + 1)) === 0 || position(id, (i + 1), -(i + 1)) === state) if (position(id, i, -i) === state) count++;
      if (i === 3 && position(id, i, -i) === state) count++;
    }
    for (let i = 1; i <= 3; i++) {
      if (i !== 3) if (position(id, -(i + 1), (i + 1)) === 0 || position(id, -(i + 1), (i + 1)) === state) if (position(id, -i, i) === state) count++;
      if (i === 3 && position(id, -i, i) === state) count++;
    }
  }
  return count;
};

const checkHorizon = (id, checkNum) => {
  let blockNum = 1;
  if (state === 1) blockNum = 2;
  let count = 1;
  if (checkNum === 5) {
    for (let i = 1; position(id, i, 0) === state; i++) count++;
    for (let i = 1; position(id, -i, 0) === state; i++) count++;
  } else {
    if (position(id, 0, 0) === blockNum) return count;
    if (position(id, 1, -1) === blockNum || position(id, -1, 1) === blockNum) return count;
    for (let i = 1; i <= 3; i++) {
      if (i !== 3) if (position(id, (i + 1), 0) === 0 || position(id, (i + 1), 0) === state) if (position(id, i, 0) === state) count++;
      if (i === 3 && position(id, i, 0) === state) count++;
    }
    for (let i = 1; i <= 3; i++) {
      if (i !== 3) if (position(id, -(i + 1), 0) === 0 || position(id, -(i + 1), 0) === state) if (position(id, -i, 0) === state) count++;
      if (i === 3 && position(id, -i, 0) === state) count++;
    }
  }
  return count;
};

const checkVertical = (id, checkNum) => {
  let blockNum = 1;
  if (state === 1) blockNum = 2;
  let count = 1;
  if (checkNum === 5) {
    for (let i = 1; position(id, 0, -i) === state; i++) count++;
    for (let i = 1; position(id, 0, i) === state; i++) count++;
  } else {
    if (position(id, 0, 0) === blockNum) return count;
    if (position(id, 1, -1) === blockNum || position(id, -1, 1) === blockNum) return count;
    for (let i = 1; i <= 3; i++) {
      if (i !== 3) if (position(id, 0, -(i + 1)) === 0 || position(id, 0, -(i + 1)) === state) if (position(id, 0, -i) === state) count++;
      if (i === 3 && position(id, 0, -i) === state) count++;
    }
    for (let i = 1; i <= 3; i++) {
      if (i !== 3) if (position(id, 0, (i + 1)) === 0 || position(id, 0, (i + 1)) === state) if (position(id, 0, i) === state) count++;
      if (i === 3 && position(id, 0, i) === state) count++;
    }
  }
  return count;
};

const check3X3 = (id) => {
  const [row, col] = id.split(',');
  const checkArr = [];
  checkArr.push(checkRightDiagonal(id, 3));
  checkArr.push(checkLeftDiagonal(id, 3));
  checkArr.push(checkHorizon(id, 3));
  checkArr.push(checkVertical(id, 3));

  const checkNum3 = checkArr.reduce((pre, cur) => {
    if (cur === 3) pre++;
    return pre;
  }, 0);

  const checkNum4 = checkArr.reduce((pre, cur) => {
    if (cur === 4) pre++;
    return pre;
  }, 0);
  if (checkNum3 >= 2) { stateArr[row][col] = 3; return 1; } 
  if (checkNum4 >= 2) { stateArr[row][col] = 4; return 2; }
};

const render = () => {
  if (state === 1) {
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        check3X3(`${i},${j}`);
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
      else html += `<td class="space-box" id="${colSelf},${rowSelf}"><div class="x-block"></div></td>`; // 3X3이 3을 저장한다면~
    });
    html += '</tr>';
  });
  $space.innerHTML = html;
};


function active() {
  if (state === 1) {
    document.querySelector('.player-2-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
  } else {
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-2-panel').classList.toggle('active');
  }
}

function init() {
  window.location.reload();
}

document.querySelector('.btn-new').addEventListener('click', init);

const $startPopup = document.querySelector('.start-popup');
const $overlay = document.querySelector('.overlay');

const $player1Name = document.querySelector('.player1-name');
const $player2Name = document.querySelector('.player2-name');
const $startBtn = document.querySelector('.start-button');
const $panelName1 = document.querySelector('.player-1-panel > .player-name');
const $panelName2 = document.querySelector('.player-2-panel > .player-name');

// POPUP UI
const popupclose = () => {
  $startPopup.style.display = 'none';
  $overlay.style.display = 'none';
};


$startBtn.onclick = () => {
  const player1Name = $player1Name.value.trim();
  const player2Name = $player2Name.value.trim();

  if (player1Name === '' || player2Name === '') return;

  popupclose();
  $panelName1.textContent = player1Name;
  $panelName2.textContent = player2Name;
};

// Ending-popup

const $endingPopup = document.querySelector('.ending-popup');
// const $victoryYes = document.querySelector('.victory-yes');
const $victoryNo = document.querySelector('.victory-no');

const endingPopup = () => {
  $endingPopup.style.visibility = 'visible';
};

const checkVictory = (id) => {
  const checkArr = []; // 동시에 5가 2개가 되었을 때 하나만 출력해주기 위해 배열에 넣어주었음
  checkArr.push(checkRightDiagonal(id, 5));
  checkArr.push(checkLeftDiagonal(id, 5));
  checkArr.push(checkHorizon(id, 5));
  checkArr.push(checkVertical(id, 5));

  if (checkArr.indexOf(5) !== -1) { return endingPopup(); }
};

$space.onclick = ({ target }) => {
  const [row, col] = target.id.split(',');
  if (!target.classList.contains('space-box') || target.innerHTML) return;

  if (state === 1) {
    if (check3X3(target.id) === 1) {
      stateArr[row][col] = 3;
      alert('33입니다');
      return;
    }
    if (check3X3(target.id) === 2) {
      stateArr[row][col] = 4;
      alert('44입니다');
      return;
    }
    checkVictory(target.id);
    stateArr[row][col] = 1;
    // target.innerHTML = '<div class="black-circle"></div>';
    state = 2;
  } else {
    checkVictory(target.id);
    stateArr[row][col] = 2;
    // target.innerHTML = '<div class="white-circle"></div>';
    state = 1;
  }
  active();
  render();
};

$victoryNo.addEventListener('click', init);

window.onload = render;
