//0 not taken and not hit
//1 taken by a ship
//2 area that is hit
//3 hit ship
//ships 5 types 5 4 3 3 2
import { newShip } from "./ship";
export const gameBoard = function (ships) {
  const board = new Array(10).fill(0).map((x) => new Array(10).fill(0));
  const ships = [...ships];
  const shipCoordinates = new Array(5).fill(new Array());
  const placeShips = function () {
    ships.forEach((ship, i) => {
      for (let j = 0; j < ship.body.length; j++) {
        board[i][j] = 1;
        shipCoordinates[i].push([i, j]);
      }
    });
  };

  const receiveAttack = function (x, y) {
    if (board[x][y] == 2 || board[x][y] == 3) return "Error:area hit before";
    if (board[x][y] == 0) board[x][y] = 2;
    else if (board[x][y] == 1) {
      board[x][y] = 3;
      const shipIndex = findShip(shipCoordinates, x, y).shipId;
      const hitCoor = findShip(shipCoordinates, x, y).shiphit;
      ships[shipIndex].hit(hitCoor);
    }
  };

  const shipsSunk = function () {
    return ships.every((ship) => ship.sunk() == true);
  };
  return {
    placeShips,
    receiveAttack,
    shipsSunk,
    board,
  };
};
//[[1,2],[1,7]]
export const findShip = function (coords, x, y) {
  let shipId;
  let shiphit;
  coords.forEach((ship, j) => {
    ship.forEach((coor, i) => {
      if (x == coor[0 && y == coor[1]]) {
        shipId = j;
        shiphit = i;
      }
    });
  });
  return {
    shipId,
    shiphit,
  };
};
// const placeShip = function (x, y, length, upside) {
//     if (upside == true) {
//       for (let i = 0; i < length; i++) {
//         board[x + i][y] = 1;
//       }
//     } else {
//       for (let i = 0; i < length; i++) {
//         board[x][y + i] = 1;
//       }
//     }
//   };
