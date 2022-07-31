import { newShip, makeShips } from "./ship";
import { gameBoard, findShip } from "./gameboard";

describe("ship factory", () => {
  test("given coordinate make a new ship", () => {
    const coordinate = [
      [1, 2],
      [1, 3],
      [1, 4],
    ];
    const ship1 = newShip(coordinate);
    expect(ship1.coordinate.join("")).toMatch(coordinate.join(""));
  });
  test("given an array of coordinates make a fleet", () => {
    const coordinates = [
      [
        [1, 2],
        [1, 3],
        [1, 4],
      ],
      [
        [2, 2],
        [2, 3],
        [2, 4],
      ],
      [
        [3, 2],
        [3, 3],
        [3, 4],
      ],
    ];
    expect(makeShips(coordinates).length).toEqual(3);
  });
  test("ship can be hit", () => {
    const coordinate = [
      [1, 2],
      [1, 3],
      [1, 4],
    ];
    const ship1 = newShip(coordinate);
    ship1.hit();
    ship1.hit();
    expect(ship1.totalHits.length).toEqual(2);
  });
  test("ship can be sunk", () => {
    const coordinate = [
      [1, 2],
      [1, 3],
      [1, 4],
    ];
    const ship1 = newShip(coordinate);
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.sunk()).toBeTruthy();
  });
});
describe("gameBoard", () => {
  const coordinates = [
    [
      [1, 2],
      [1, 3],
      [1, 4],
    ],
    [
      [2, 2],
      [2, 3],
      [2, 4],
    ],
    [
      [3, 2],
      [3, 3],
      [3, 4],
    ],
  ];
  const fleet = makeShips(coordinates);
  const playerBoard = gameBoard(fleet);
  test("places ships on correct position", () => {
    expect(playerBoard.board[1][2]).toEqual(1);
    expect(playerBoard.board[1][3]).toEqual(1);
    expect(playerBoard.board[1][4]).toEqual(1);
    expect(playerBoard.board[1][5]).toEqual(0);
    expect(playerBoard.board[3][2]).toEqual(1);
  });
  test("receive attack", () => {
    playerBoard.receiveAttack(1, 2);
    playerBoard.receiveAttack(2, 0); //water hit
    playerBoard.receiveAttack(3, 2); //ship hit
    expect(playerBoard.receiveAttack(1, 2)).toMatch("Error:area hit before");
    expect(playerBoard.board[2][0]).toEqual(2);
    expect(playerBoard.board[3][2]).toEqual(3);
  });
  test("hit the correct ship", () => {
    const shipId1 = findShip(fleet, 1, 2);
    const shipId2 = findShip(fleet, 2, 3);
    const shipId3 = findShip(fleet, 3, 3);
    expect(shipId1).toEqual(0);
    expect(shipId2).toEqual(1);
    expect(shipId3).toEqual(2);
  });
});
describe("dom functions", () => {});
