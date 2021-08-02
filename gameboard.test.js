const Gameboard = require("./gameboard");

test("test #1 getBoard()", () => {
  const game = Gameboard();
  expect(game.getBoard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("test#2 getSumTotalSegments()", () => {
  const game = Gameboard();
  game.placeShip(1, [3, 3], "horizontal");
  expect(game.getSumTotalSegments()).toEqual(1);
});

test("test#3 getSumTotalSegments()", () => {
  const game = Gameboard();
  game.placeShip(5, [3, 3], "horizontal");
  expect(game.getSumTotalSegments()).toEqual(5);
});

test("test #4 place ship horizontal", () => {
  const game = Gameboard();
  expect(game.placeShip(3, [2, 4], "horizontal")).toEqual([
    [2, 4],
    [3, 4],
    [4, 4],
  ]);
});

test(" test#5, place ship vertical", () => {
  const game = Gameboard();
  expect(game.placeShip(4, [9, 4], "vertical")).toEqual([
    [9, 4],
    [9, 5],
    [9, 6],
    [9, 7],
  ]);
});

test("test #6 check hor vertical", () => {
  const game = Gameboard();
  expect(["horizontal", "vertical"]).toContain(game.randomOrientation());
});

test("test #7 check if ship within bounds", () => {
  const game = Gameboard();
  expect(game.validShipPlacement(8, [2, 4], "horizontal")).toEqual(true);
});

test("test #8 check if ship out of bounds", () => {
  const game = Gameboard();
  expect(game.validShipPlacement(2, [9, 9], "vertical")).toEqual(false);
});

test("test #9 validShipPlacement() check if ship out of bounds", () => {
  const game = Gameboard();
  game.placeShip(5, [3, 3], "horizontal");
  expect(game.validShipPlacement(5, [3, 3], "horizontal")).toEqual(false);
});

test("test #10 validShipPlacement(), ship double placed", () => {
  const game = Gameboard();
  game.placeShip(10, [0, 0], "horizontal");
  expect(game.validShipPlacement(1, [0, 0], "vertical")).toEqual(false);
});

test("test #10 validShipPlacement(), ship placed legally", () => {
  const game = Gameboard();
  game.placeShip(10, [0, 0], "horizontal");
  expect(game.validShipPlacement(10, [0, 1], "horizontal")).toEqual(true);
});

test("test #11 validShipPlacement() debug ship double placed", () => {
  const game = Gameboard();
  game.placeShip(3, [3, 4], "vertical");
  expect(game.validShipPlacement(3, [3, 2], "vertical")).toEqual(false);
});

test("test#12 generate ships, ensure it equals 21", () => {
  const game = Gameboard();
  expect(game.generateShips().sum).toEqual(21);
});

test("test#13 getFleet(), ensure it equals 8", () => {
  const game = Gameboard();
  game.generateShips();
  expect(game.getFleet().length).toEqual(8);
});

test("test#14 recieve attack. this isnt actyually testing attack", () => {
  const game = Gameboard();
  game.generateShips();
  game.receiveAttack([0, 0]);
  game.receiveAttack([0, 1]);
  game.receiveAttack([0, 2]);
  game.receiveAttack([0, 3]);
  game.receiveAttack([0, 4]);
  game.receiveAttack([0, 5]);
  game.receiveAttack([0, 6]);
  game.receiveAttack([0, 7]);
  game.receiveAttack([0, 8]);
  game.receiveAttack([0, 9]);
  //   console.log(game.getFleet());
  expect(game.getFleet().length).toEqual(8);
});

test("test#15 checkArrayExistsinArray", () => {
  const game = Gameboard();
  expect(
    game.checkArrayExistsinArray(
      [
        [3, 4],
        [4, 5],
      ],
      [3, 4]
    )
  ).toEqual("0");
});

test("test#16 checkArrayExistsinArray", () => {
  const game = Gameboard();
  expect(
    game.checkArrayExistsinArray(
      [
        [3, 4],
        [4, 5],
      ],
      [9, 7]
    )
  ).toEqual(-1);
});

test("test#17 checkArrayExistsinArray", () => {
  const game = Gameboard();
  expect(
    game.checkArrayExistsinArray(
      [
        [3, 4],
        [4, 5],
      ],
      [3, 7]
    )
  ).toEqual(-1);
});

test("test#18 allSunk(), new board", () => {
  const game = Gameboard();
  game.generateShips();
  expect(game.allSunk()).toEqual(false);
});

test("test#19 allSunk(), attack all", () => {
  const game = Gameboard();
  game.generateShips();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      game.receiveAttack([i, j]);
    }
  }
  expect(game.allSunk()).toEqual(true);
});

// test("generate ships", () => {
//   const game = Gameboard();
//   game.placeShip(5, [3, 5], "vertical");
//   game.placeShip(4, [7, 5], "vertical");
//   game.placeShip(3, [7, 9], "horizontal");
//   expect(game.getBoard()).toEqual(1);
// });

//    "success: 5 + 3,5 + vertical",
//"success: 4 + 7,5 + vertical",
//"success: 3 + 7,9 + horizontal",

///placed in testing

// test("clear board", () => {
//   const game = Gameboard();
//   expect(game.clearBoard()).toEqual([
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   ]);
// });
