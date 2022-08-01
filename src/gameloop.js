import { displayBoard, displayBoardAi, gameFinished } from "./dom2";
import { makeShips } from "./ship";
import { gameBoard } from "./gameboard";
import { aiPlayerCoordinates } from "./players";
export const gameStart = function (playerCoordinates) {
  const playerFleet = makeShips(playerCoordinates);
  const aiFleet = makeShips(aiPlayerCoordinates());
  const playerGameboard = gameBoard(playerFleet, "player");
  const aiGameboard = gameBoard(aiFleet, "ai");
  displayBoard(playerGameboard);
  displayBoardAi(aiGameboard);
  hitAiBoard(aiGameboard, playerGameboard);
};
const hitAiBoard = function (aiGameboard, playerGameboard) {
  const aiBoxes = document.querySelectorAll(".gridBoxAi");
  aiBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      const coordinate = box.getAttribute("data-coori").split("");
      if (checkCoor(coordinate, aiGameboard)) {
        return;
      }
      aiGameboard.receiveAttack(coordinate[0], coordinate[1]);
      displayBoardAi(aiGameboard);
      gamefinished(aiGameboard, playerGameboard);
      const aiCoordinate = aiHitCoordnates(playerGameboard);
      playerGameboard.receiveAttack(aiCoordinate[0], aiCoordinate[1]); ///////////must not repeat
      displayBoard(playerGameboard);
      gamefinished(aiGameboard, playerGameboard);
    });
  });
};

export const aiHitCoordnates = function (aiGameboard) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  let coor = [x, y];
  if (aiGameboard.board[x][y] == 2 || aiGameboard.board[x][y] == 3) {
    coor = aiHitCoordnates(aiGameboard);
  }

  return coor;
};
const checkCoor = function (coordinate, gameBoard) {
  const x = coordinate[0];
  const y = coordinate[1];
  if (gameBoard.board[x][y] == 2 || gameBoard.board[x][y] == 3) {
    return true;
  }
};
const gamefinished = function (board1, board2) {
  if (board1.shipsSunk()) {
    gameFinished(board1.name);
    console.log(12);
  }
  if (board2.shipsSunk()) {
    gameFinished(board2.name);
    console.log(12);
  }
};
