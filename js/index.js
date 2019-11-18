const SIZE = 19;
let state = 1;

const stateArr = Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));

const $space = document.querySelector('.space');

const render = () => {
  let html = '';
  stateArr.forEach((col, colSelf) => {
    html += '<tr>';
    col.forEach((row, rowSelf) => {
      if (row === 0) html += `<td class="space-box" id="${colSelf},${rowSelf}"></td>`;
      else if (row === 1) html += `<td class="space-box" id="${colSelf},${rowSelf}"><div class="black-circle"></div></td>`;
      else if (row === 2) html += `<td class="space-box" id="${colSelf},${rowSelf}"><div class="white-circle"></div></td>`;
      // else html += `<td class="space-box" id="${colSelf},${rowSelf}"><div class="white-circle"></div></td>`; // 3X3이 3을 저장한다면~
    });
    html += '</tr>';
  });
  $space.innerHTML = html;
};

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
    if (position(id, -1, -1) === blockNum || position(id, 1, 1) === blockNum) return count;
    for (let i = 1; i <= 3; i++) if (position(id, -(i + 1), -(i + 1)) === 0 || position(id, -(i + 1), -(i + 1)) === state) if (position(id, -i, -i) === state) count++;
    for (let i = 1; i <= 3; i++) if (position(id, (i + 1), (i + 1)) === 0 || position(id, (i + 1), (i + 1)) === state) if (position(id, i, i) === state) count++;
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
    if (position(id, 1, -1) === blockNum || position(id, -1, 1) === blockNum) return count;
    for (let i = 1; i <= 3; i++) if (position(id, (i + 1), -(i + 1)) === 0 || position(id, (i + 1), -(i + 1)) === state) if (position(id, i, -i) === state) count++;
    for (let i = 1; i <= 3; i++) if (position(id, -(i + 1), (i + 1)) === 0 || position(id, -(i + 1), (i + 1)) === state) if (position(id, -i, i) === state) count++;
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
    if (position(id, -1, 0) === blockNum || position(id, 1, 0) === blockNum) return count;
    for (let i = 1; i <= 3; i++) if (position(id, (i + 1), 0) === 0 || position(id, (i + 1), 0) === state) if (position(id, i, 0) === state) count++;
    for (let i = 1; i <= 3; i++) if (position(id, -(i + 1), 0) === 0 || position(id, -(i + 1), 0) === state) if (position(id, -i, 0) === state) count++;
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
    if (position(id, 0, -1) === blockNum || position(id, 0, 1) === blockNum) return count;
    for (let i = 1; i <= 3; i++) if (position(id, 0, -(i + 1)) === 0 || position(id, 0, -(i + 1)) === state) if (position(id, 0, -i) === state) count++;
    for (let i = 1; i <= 3; i++) if (position(id, 0, (i + 1)) === 0 || position(id, 0, (i + 1)) === state) if (position(id, 0, i) === state) count++;
  }
  return count;
};

const checkVictory = (id) => {
  const checkArr = []; // 동시에 5가 2개가 되었을 때 하나만 출력해주기 위해 배열에 넣어주었음
  checkArr.push(checkRightDiagonal(id, 5));
  checkArr.push(checkLeftDiagonal(id, 5));
  checkArr.push(checkHorizon(id, 5));
  checkArr.push(checkVertical(id, 5));

  if (checkArr.indexOf(5) !== -1) console.log('victory');
};

const check3X3 = (id) => {
  const checkArr = [];
  checkArr.push(checkRightDiagonal(id, 3));
  checkArr.push(checkLeftDiagonal(id, 3));
  checkArr.push(checkHorizon(id, 3));
  checkArr.push(checkVertical(id, 3));

  const checkNum = checkArr.reduce((pre, cur) => {
    if (cur === 3) pre++;
    return pre;
  }, 0);

  if (checkNum >= 2) console.log(33);
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

$space.onclick = ({ target }) => {
  const [row, col] = target.id.split(',');
  if (!target.classList.contains('space-box') || target.innerHTML) return;

  if (state === 1) {
    target.innerHTML = '<div class="black-circle"></div>';
    stateArr[row][col] = 1;
    checkVictory(target.id);
    check3X3(target.id);
    state = 2;
  } else {
    target.innerHTML = '<div class="white-circle"></div>';
    stateArr[row][col] = 2;
    checkVictory(target.id);
    check3X3(target.id);
    state = 1;
  }
  active();
  render();
};

function init() {
  window.location.reload();
}

document.querySelector('.btn-new').addEventListener('click', init);

window.onload = render;
