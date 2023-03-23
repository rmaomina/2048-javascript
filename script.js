var board;
var scroe = 0;
var rows = 4;
var cols = 4;

window.onload = function() {
  setGame();
}

function setGame() {
  board = [
    [2, 0, 1, 3], // 3, 0, 3, 0 -> 0, 3, 0, 3(reverse)
    [0, 2, 2, 2], // 2, 2, 2, 0 -> 0, 2, 2, 2("")
    [2, 2, 0, 0], // 2, 2, 0, 0 -> 0, 2, 2, 0("")
    [1, 2, 3, 6]  // 3, 3, 6, 0 -> 0, 3, 3, 6("")
  ]

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = document.createElement('div')
      tile.id = `${r.toString()}-${c.toString()}`
      let num = board[r][c]
      updateTile(tile, num)
      document.querySelector('#board').append(tile)
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = ''
  tile.classList.value = ''
  tile.classList.add('tile')
  if (num > 0) {
    tile.innerText = num
    tile.classList.add(`n${num}`)
  }
}

function addTwoNum(row, idx) {
  row[idx - 1] = row[idx] + row[idx - 1]
  row[idx] = 0
  return row 
}

function addTwoNum(row, idx) {
  row[idx - 1] = row[idx] + row[idx - 1]
  row[idx] = 0
  return row 
}

function slide(row) {
  for (let i = 1; i < row.length; i++) {
    if (row[i - 1] === 0 ||
        row[i - 1] + row[i] === 3 ||
        (row[i - 1] === row[i] && !(row[i] === 1 || row[i] === 2))) {
          addTwoNum(row, i)
        }
  }
  return row
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r]
    row = slide(row)
    board[r] = row

    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`)
      updateTile(tile, board[r][c])
    }
  }
  console.table(board)
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r]
    row.reverse()
    row = slide(row)
    row.reverse()
    board[r] = row

    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`)
      updateTile(tile, board[r][c])
    }
  }
  console.table(board)
}

document.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowLeft') {
    slideLeft()
  } 
  else if (e.code === 'ArrowRight') {
    slideRight()
  }
})