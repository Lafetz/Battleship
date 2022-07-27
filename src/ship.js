//grid is 10x10
//max size is 4
//0000
export const newShip = function (name, length) {
  const shipName = name;
  const shipLength = length;
  const body = new Array(length).fill(0);
  const hit = function (hitArea) {
    body[hitArea] = 1;
  };
  const sunk = function () {
    const totalHits = body.reduce((x, y) => {
      x + y;
    });
    if (totalHits === length) return true;
    else return false;
  };

  return {
    hit,
    sunk,
    body,
  };
};
