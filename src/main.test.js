import { newShip } from "./ship";
import { gameBoard } from "./gameboard";
import { findShip } from "./gameboard";
test("find ship", () => {
  const coor = [
    [
      [1, 2],
      [1, 4],
    ],
    [
      [1, 2],
      [5, 8],
    ],
    [
      [1, 6],
      [0, 5],
    ],
  ];
  expect(findShip(coor, 5, 8).shipId).toEqual(1);
  expect(findShip(coor, 1, 2).shiphit).toEqual(0);
});
describe("ship", () => {
  const ship1 = newShip("testShip1", 3);
  const ship2 = newShip("testShip2", 3);
  test("ship should be hittable", () => {
    ship1.hit(1);
    const shipBody = [0, 1, 1];
    ship1.hit(2);
    expect(ship1.body).toEqual(shipBody);
  });
  test("sunkFunction should show wether ship is sunk or not", () => {
    expect(ship1.sunk()).not.toBeTruthy();
    ship2.hit(0);
    ship2.hit(1);
    ship2.hit(2);
    expect(ship2.sunk()).toBeTruthy();
  });
});

describe("gameBoard", () => {
  const board1 = gameBoard();
  board1.placeShips();
  test("registers hit on ship", () => {
    board1.receiveAttack(0, 0);
    expect(board1.board[0][0]).toEqual(3);
  });
  test("registers hit on water", () => {
    board1.receiveAttack(0, 5);
    expect(board1.board[0][5]).toEqual(2);
  });
});
