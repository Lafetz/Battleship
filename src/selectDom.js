import { selectShips } from "./dom";
export const removeSelection = function (n) {
  const removeShip = document.querySelector(`[data-ships='${n}']`);
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
