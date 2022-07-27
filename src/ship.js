//grid is 10x10
//max size is 5
//0000
export const newShip = function (length) {
  const body = new Array(length).fill(0);
  const hit = function (hitArea) {
    body[hitArea] = 1;
  };
  const sunk = function () {
    const totalHits = body.reduce((x, y) => x + y, 0);
    if (totalHits === body.length) return true;
    else return false;
  };

  return {
    hit,
    sunk,
    body,
  };
};
