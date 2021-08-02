const Ship = require("./ship");

test("new Ship, test length", () => {
  const newShip = Ship(3);
  expect(newShip.getLength()).toEqual(3);
});

test("new Ship health", () => {
  const newShip = Ship(3);
  expect(newShip.getHealth()).toEqual(["-", "-", "-"]);
});

test("hit Ship", () => {
  const newShip = Ship(3);
  newShip.hit(2);
  expect(newShip.getHealth()).toEqual(["-", "-", "X"]);
});

test("hit Ship all", () => {
  const newShip = Ship(3);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(0);
  expect(newShip.getHealth()).toEqual(["X", "X", "X"]);
});

test("hit ship all, test sunk", () => {
  const newShip = Ship(3);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(0);
  expect(newShip.isSunk()).toEqual(true);
});

test("hit ship once, sunk test", () => {
  const newShip = Ship(3);
  newShip.hit(0);
  expect(newShip.isSunk()).toEqual(false);
});

test("new ship sunk test", () => {
  const newShip = Ship(3);
  expect(newShip.isSunk()).toEqual(false);
});
