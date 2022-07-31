export const newShip = function (coordinate) {
  const length = coordinate.length;

  let totalHits = 0;
  const hit = function () {
    totalHits += 1;
  };
  const sunk = function () {
    if (totalHits === length) return true;
    else return false;
  };

  return {
    hit,
    sunk,
    coordinate,
  };
};
export const makeShips = function (coordinates) {
  const fleet = [];
  coordinates.forEach((c) => {
    const ship = newShip(c);
    fleet.push(ship);
  });
  return fleet;
};
