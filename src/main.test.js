import { newShip } from "./ship";

describe("ship", () => {
  const ship1 = newShip("testShip1", 3);
  const ship2 = newShip("testShip2", 3);
  test("ship should be hittable", () => {
    ship1.hit(1);
    const shipBody = [0, 1, 0];
    expect(ship1.body).toEqual(shipBody);
    const shipBody2 = [0, 1, 1];
    ship1.hit(2);
    expect(ship1.body).toEqual(shipBody2);
  });
  test("sunkFunction should show wether ship is sunk or not", () => {
    expect(ship1.sunk()).not.toBeTruthy();
    ship2.hit(0);
    ship2.hit(1);
    ship2.hit(2);
    expect(ship2.sunk()).toBeTruthy();
  });
});
