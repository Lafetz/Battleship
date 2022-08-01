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
export const aiPlayerCoordinates = function () {
  const numbers = [];
  const giveNo = function () {
    let random = Math.floor(Math.random() * 10);
    if (checkNo(random, numbers)) {
      console.log(random);
    }
    numbers.push(random);
    return random;
  };

  const random5 = Math.floor(Math.random() * 6);
  const ship5 = new Array(5).fill(0).map((x, i) => [1, random5 + i]);
  const random4 = Math.floor(Math.random() * 7);
  const ship4 = new Array(4).fill(0).map((x, i) => [3, random4 + i]);
  const random3 = Math.floor(Math.random() * 8);
  const ship3 = new Array(3).fill(0).map((x, i) => [4, random3 + i]);
  const ship33 = new Array(3).fill(0).map((x, i) => [6, random3 + i]);
  const random2 = Math.floor(Math.random() * 9);
  const ship2 = new Array(2).fill(0).map((x, i) => [9, random2 + i]);
  console.log(ship2, ship3, ship33, ship4, ship5);
  return [ship2, ship3, ship33, ship4, ship5];
};
const checkNo = function (x, numbers) {
  let exists = false;
  numbers.forEach((n) => {
    if (n == x) {
      exists = true;
    }
  });
  return exists;
};
