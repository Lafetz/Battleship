import { displayBoard } from "./dom2";
import { makeShips } from "./ship";
import { gameBoard } from "./gameboard";
export const gameStart = function (playerCoordinates) {
  //next ai
  const playerFleet = makeShips(playerCoordinates);
  const playerGameboard = gameBoard(playerFleet);
  displayBoard(playerGameboard, "player");
};
