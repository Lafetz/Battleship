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
export const displayBoard = function (gameBoard) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinate = [i, j].join("");
      const box = document.querySelector(`[data-coor="${coordinate}"]`);
      if (gameBoard.board[i][j] == 0) {
        box.style.backgroundColor = "antiquewhite";
      } else if (gameBoard.board[i][j] == 1) {
        box.style.background = "green";
      } else if (gameBoard.board[i][j] == 2) {
        box.style.background = "blue";
      } else {
        box.style.background = "red";
      }
    }
  }
};

export const displayBoardAi = function (gameBoard) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinate = [i, j].join("");
      const box = document.querySelector(`[data-coori="${coordinate}"]`);
      if (gameBoard.board[i][j] == 3) {
        box.style.backgroundColor = "red";
      } else if (gameBoard.board[i][j] == 2) {
        box.style.background = "blue";
      } else {
        box.style.backgroundColor = "antiquewhite";
      }
    }
  }
};
export const gameFinished = function (name) {
  const body = document.querySelector("body");
  const background = document.createElement("div");
  background.classList.add("background");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("messageDiv");
  const message = document.createElement("h3");
  message.textContent = `${name} has won!!`;
  messageDiv.append(message);
  background.append(messageDiv);
  body.append(background);
};
