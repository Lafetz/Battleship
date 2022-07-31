export const newShip = function (coordinate) {
  const length = coordinate.length;
  const totalHits = [];
  const hit = function () {
    totalHits.push(1);
  };
  const sunk = function () {
    if (totalHits.length === length) return true;
    else return false;
  };

  return {
    hit,
    sunk,
    coordinate,
    totalHits,
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
