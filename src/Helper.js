export const makeBoard = () => {
  let arr = Array.from(Array(6), () => new Array(7));
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      arr[row][col] = "white";
    }
  }
  return arr;
};

export const colorMatchCheck = (one, two, three, four) => {
  return one === two && one === three && one === four && one !== "white";
};

export const horizontalCheck = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        colorMatchCheck(
          board[row][col],
          board[row][col + 1],
          board[row][col + 2],
          board[row][col + 3]
        )
      )
        return true;
    }
  }
};

export const verticalCheck = (board) => {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          board[row][col],
          board[row + 1][col],
          board[row + 2][col],
          board[row + 3][col]
        )
      )
        return true;
    }
  }
};

export const diagonalCheck1 = (board) => {
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          board[row][col],
          board[row + 1][col + 1],
          board[row + 2][col + 2],
          board[row + 3][col + 3]
        )
      )
        return true;
    }
  }
};

export const diagonalCheck2 = (board) => {
  for (let col = 0; col < 4; col++) {
    for (let row = 5; row > 2; row--) {
      if (
        colorMatchCheck(
          board[row][col],
          board[row - 1][col + 1],
          board[row - 2][col + 2],
          board[row - 3][col + 3]
        )
      )
        return true;
    }
  }
};

export const overAllCheck = (board, player) => {
  if (
    horizontalCheck(board) ||
    verticalCheck(board) ||
    diagonalCheck1(board) ||
    diagonalCheck2(board)
  ) {
    return true;
  }
};

export const drawCheck = (board, row) => {
  let fullSlot = [];
  for (let i = 0; i < board[row].length; i++) {
    if (board[row][i] !== "white") {
      fullSlot.push(board[row][i]);
    }
  }
  if (fullSlot.length === board[row].length) {
    return true;
  }
};
