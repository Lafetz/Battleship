export const player = function () {
  const hitCoords = new Array();
  const hitShip = function (x, y) {
    let repeat = false;
    hitCoords.forEach((coor, i) => {
      if (coor[0] == x && coor[1] == y) {
        repeat = true;
      }
    });
    if (repeat) return "repeat";
    hitCoords.push([x, y]);
  };
  return {
    hitShip,
  };
};
export const aiPlayer = function () {
  const xAxis = Math.floor(Math.random() * 10);
  const yAxis = Math.floor(Math.random() * 10);
  return {
    xAxis,
    yAxis,
  };
};
[(1)[(2)[(1, 2)]]];
const placeTaken = function (placedShips, place) {
  let taken = false;
  placedShips.forEach((ship) => {
    ship.forEach((x) => {
      if (x[0] + x[1] == 2) {
      }
    });
  });
};
