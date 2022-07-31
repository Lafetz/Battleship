import { createBoard, selectShips } from "./dom";
import { displayBoard, startGame } from "./selectDom";
const userShipSelction = (function () {
  createBoard("player");
  const playerShips = [];
  const shipsToSelect = document.querySelectorAll(".ships");
  shipsToSelect.forEach((ship) => {
    ship.addEventListener("click", () => {
      const gameBoard = document.querySelector(`#player`);
      gameBoard.addEventListener(
        "click",
        () => {
          if (playerShips.length == 5) {
            startGame();
          }
        },
        { once: true }
      );
      const shipSize = ship.getAttribute("data-ships");
      selectShips(shipSize, playerShips);
    });
  });
})();
