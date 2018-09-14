module.exports.getEmptyPositions = board => {
  const arr = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] == 0) arr.push([row, col]);
    }
  }

  return arr;
};

module.exports.checkRow = (board, row, value) => {
  for (let val of board[row]) {
    if (val === value) return false;
  }
  return true;
};

module.exports.checkCol = (board, col, value) => {
  for (let row = 0; row < board.length; row++) {
    if (board[row][col] === value) return false;
  }
  return true;
};

module.exports.check3x3Square = (board, row, col, value) => {
  const step = 3;
  let startRow = Math.floor(row / step) * step;
  let startCol = Math.floor(col / step) * step;

  for (let row = startRow; row < startRow + step; row++) {
    for (let col = startCol; col < startCol + step; col++) {
      if (board[row][col] === value) return false;
    }
  }
  return true;
};

module.exports.checkValue = (board, row, col, value) => {
  if (
    this.checkRow(board, row, value) &&
    this.checkCol(board, col, value) &&
    this.check3x3Square(board, row, col, value)
  ) {
    return true;
  }
  return false;
};

module.exports.solveSudoku = (board) => {
  const emptyPositions = this.getEmptyPositions(board)

  const limit = 9
  let i, col, row, value, found

  for(i = 0; i < emptyPositions.length; ) {
    row = emptyPositions[i][0]
    col = emptyPositions[i][1]
    value = board[row][col] + 1

    found = false
    
    while(!found && value <= limit) {
      if(this.checkValue(board, row, col, value)) {
        found = true
        board[row][col] = value
        // go to the next zero pozition
        i++
      } else {
        // increment value
        value++
      }
    }

    // if after iteretion thorugh all possible value we didn't found anything - go step back and try increment the value
    // current value reset in case if it will be backtracing there can be no solution if we start form 7 for example - so we reset it and go back and try tgen again from 0
    if(!found) {
      board[row][col] = 0
      i--
    }

  }
  console.log(board)
  return board
}
