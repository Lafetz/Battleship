import { createBoard } from "./dom";
export const removeSelection = function (n) {
  const removeShip = document.querySelector(`[data-ships='${n}']`);
  if (removeShip === null) return;
  removeShip.remove();
};
export const displaySelectedAreas = function (areas) {
  areas.forEach((ship) => {
    ship.forEach((coor) => {
      coor = coor.join("");
      const gridBox = document.querySelector(`[data-coor="${coor}"]`);
      gridBox.style.background = "green";
    });
  });
};
export const startGame = function () {
  const placedShipsSelection = document.querySelector(".playerShips");
  placedShipsSelection.remove();
  createBoard("ai");
};
export const displayBoard = function (gameBoard, player) {
  const gridBoxes = document.querySelector(`#${player}`);
  gameBoard.forEach((row, i) => {
    row.forEach((x, j) => {
      const coordinate = [x, j].join("");
      const box = document.querySelector(`data-coor="${coordinate}"`);
      if (gameBoard[x][y] == 0) {
        box.style.background = "antiquewhite";
      } else if (gameBoard[x][y] == 1) {
        box.style.background = "green";
      } else if (gameBoard[x][y] == 2) {
        box.style.background = "blue";
      } else {
        box.style.background = "red";
      }
    });
  });
};
