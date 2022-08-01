import { createBoard, selectShips } from "./dom";
import { displayBoard, startGame } from "./dom2";
import { gameStart } from "./gameloop";

const userShipSelction = (function () {
  createBoard("player");
  const playerShips = [];
  const shipsToSelect = document.querySelectorAll(".ships");
  shipsToSelect.forEach((ship) => {
    ship.addEventListener("click", () => {
      const shipSize = ship.getAttribute("data-ships");
      selectShips(shipSize, playerShips);

      const gameBoard = document.querySelector(`#player`);
      gameBoard.addEventListener(
        "click",
        () => {
          if (playerShips.length == 5) {
            startGame();
            gameStart(playerShips);
          }
        },
        { once: true }
      );
    });
  });
})();
