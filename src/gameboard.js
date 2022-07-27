//0 not taken and not hit
//1 taken by a ship
//2 area that is hit
//3 hit ship

export const gameBoard = function () {
  const board = new Array(10).fill(0).map((x) => new Array(10).fill(0));

  const placeShip = function (x, y, length, upside) {
    if (upside == true) {
      for (let i = 0; i < length; i++) {
        board[x + i][y] = 1;
      }
    } else {
      for (let i = 0; i < length; i++) {
        board[x][y + i] = 1;
      }
    }
  };
};
