import { newShip, makeShips } from "./ship";
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
        [1, 2],
        [1, 3],
        [1, 4],
      ],
      [
        [1, 2],
        [1, 3],
        [1, 4],
      ],
    ];
    expect(makeShips(coordinates).length).toEqual(3);
  });
});
