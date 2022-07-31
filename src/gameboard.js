//0 not taken and not hit
//1 taken by a ship
//2 area that is hit
//3 hit ship
//ships 5 types 5 4 3 3 2
import { newShip } from "./ship";
export const gameBoard = function (fleet) {
  const board = new Array(10).fill(0).map((x) => new Array(10).fill(0));
  const ships = [...fleet];

  const placeShips = (function () {
    ships.forEach((ship) => {
      const shipCoordinates = [...ship.coordinate];
      shipCoordinates.forEach((c) => {
        const x = c[0];
        const y = c[1];
        board[x][y] = 1;
      });
    });
  })();

  const receiveAttack = function (x, y) {
    if (board[x][y] == 2 || board[x][y] == 3) return "Error:area hit before";
    if (board[x][y] == 0) board[x][y] = 2;
    else if (board[x][y] == 1) {
      board[x][y] = 3;
      const shipIndex = findShip(fleet, x, y);
      ships[shipIndex].hit();
    }
  };

  const shipsSunk = function () {
    return ships.every((ship) => ship.sunk() == true);
  };
  return {
    receiveAttack,
    shipsSunk,
    board,
  };
};

export const findShip = function (fleet, x, y) {
  let shipId;
  fleet.forEach((ship, i) => {
    ship.coordinate.forEach((c) => {
      if (c[0] == x && c[1] == y) {
        shipId = i;
      }
    });
  });
  return shipId;
};
