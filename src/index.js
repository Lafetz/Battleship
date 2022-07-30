import { createBoard, selectShips } from "./dom";

const userShipSelction = (function () {
  createBoard("player");
  let totalShipsPlaced = 0;
  const playerShips = [];
  const shipsToSelect = document.querySelectorAll(".ships");
  shipsToSelect.forEach((ship) => {
    ship.addEventListener("click", () => {
      const gameBoard = document.querySelector(`#player`);
      gameBoard.addEventListener(
        "click",
        () => {
          totalShipsPlaced += 1;
          console.log(totalShipsPlaced);
        },
        { once: true }
      );
      const shipSize = ship.getAttribute("data-ships");
      selectShips(shipSize, playerShips);
    });
  });
})();
