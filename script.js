var board;
var scroe = 0;
var rows = 4;
var cols = 4;
var sets = [1, 2, 3, 6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072, 6144];
var max = 0;
var score = 0;
var bgColor = 1;

window.onload = function () {
  setGame();
  setTile();
  setTile();

  setInterval(changeBgColor, 10000);
};

function changeBgColor() {
  const body = document.querySelector("body");
  if (bgColor > 10) bgColor = 1;
  else bgColor += 1;

  body.classList = "";
  body.classList.add(`c${bgColor}`);
}

function resetGame() {
  document.querySelector("#board").textContent = "";
  document.querySelector("#score").textContent = "";
  alertMessage("");
  setGame();
  setTile();
  setTile();
}

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = document.createElement("div");
      tile.id = `${r.toString()}-${c.toString()}`;
      updateTile(tile, board[r][c]);
      document.querySelector("#board").append(tile);
    }
  }
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 0) return true;
    }
  }
  return false;
}

function setTile() {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;

  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    let randomIdx = Math.floor(
      Math.random() * Math.max(sets.findIndex(el => el === max) - 2, 2),
    );
    console.log(sets[randomIdx]);
    if (board[r][c] === 0) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      board[r][c] = sets[randomIdx];
      updateTile(tile, sets[randomIdx]);
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    tile.classList.add(`n${num}`);
    max = Math.max(max, num);
  }
}

function addTwoNum(row, idx) {
  row[idx - 1] = row[idx] + row[idx - 1];
  row[idx] = 0;
  return row;
}

function slide(row) {
  for (let i = 1; i < row.length; i++) {
    if (
      row[i - 1] === 0 ||
      row[i - 1] + row[i] === 3 ||
      (row[i - 1] === row[i] &&
        !(row[i] === 1 || row[i] === 2) &&
        (row[i - 1] + row[i]) % 3 === 0)
    ) {
      addTwoNum(row, i);
      score += row[i] + row[i - 1];
    }
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      updateTile(tile, board[r][c]);
    }
  }
  nextRound();
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      updateTile(tile, board[r][c]);
    }
  }
  nextRound();
}

function slideDown() {
  for (let c = 0; c < cols; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      updateTile(tile, board[r][c]);
    }
  }
  nextRound();
}

function slideUp() {
  for (let c = 0; c < cols; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      updateTile(tile, board[r][c]);
    }
  }
  nextRound();
}

function nextRound() {
  if (hasEmptyTile()) setTile();
  else alertMessage("더이상 움직일 수 있는 타일이 없습니다.");
}

function alertMessage(text) {
  document.querySelector("#alertMessage").textContent = text;
}

document.addEventListener("keyup", e => {
  if (e.code === "ArrowLeft") {
    slideLeft();
  } else if (e.code === "ArrowRight") {
    slideRight();
  } else if (e.code === "ArrowUp") {
    slideUp();
  } else if (e.code === "ArrowDown") {
    slideDown();
  }

  document.querySelector("#score").textContent = score.toLocaleString("ko-KR");
});

const resetBtn = document.querySelector("#btnReset");
resetBtn.addEventListener("click", resetGame);
