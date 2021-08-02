// const Ship = require("./ship");
import Ship from "./ship.js";

const Gameboard = () => {
  const shipLengths = [5, 4, 3, 3, 2];
  // const shipLengths = [10, 10, 10, 10, 10, 10, 10];
  const fleet = [];
  const board = [
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
  ];

  function getBoard() {
    return board;
  }

  function getFleet() {
    return fleet;
  }

  function getData() {
    let hitCount = 0;
    let missCount = 0;
    let segmentsLeft = 0;
    for (let i in board) {
      for (let j in board[i]) {
        if (board[i][j] == "X") {
          hitCount++;
        }
        if (board[i][j] == "O") {
          missCount++;
        }
        if (board[i][j] == "1") {
          segmentsLeft++;
        }
      }
    }
    let total = hitCount + segmentsLeft;
    return { hitCount, missCount, segmentsLeft, total };
  }

  function getSumTotalSegments() {
    let sumOfEachArray = (r, a) => r.map((b, i) => a[i] + b);
    let total = board.reduce(sumOfEachArray).reduce((a, b) => a + b);
    return total;
  }

  function randomOrientation() {
    const orientationArr = ["vertical", "horizontal"];
    const random = Math.floor(Math.random() * orientationArr.length);
    return orientationArr[random];
  }

  function randomCoordinate() {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);
    return [randomX, randomY];
  }

  function validShipPlacement(length, coordinates, orientation) {
    let x = coordinates[0];
    let y = coordinates[1];
    let position;
    if (orientation == "horizontal") {
      position = x;
    } else if (orientation == "vertical") {
      position = y;
    }
    if (length + position > 10) {
      return false;
    }
    if (orientation == "horizontal") {
      for (let i = 0; i < length; i++) {
        if (board[y][x + i] != 0) {
          return false;
        }
      }
    }
    if (orientation == "vertical") {
      for (let j = 0; j < length; j++) {
        if (board[y + j][x] != 0) {
          return false;
        }
      }
    }
    return true;
  }

  function generateShips() {
    let i = 0;
    let attempts = 0;
    let length;
    let randomCo;
    let randomOr;

    while (i < shipLengths.length) {
      length = shipLengths[i];
      randomCo = randomCoordinate();
      randomOr = randomOrientation();
      if (validShipPlacement(length, randomCo, randomOr)) {
        let coordinates = placeShip(length, randomCo, randomOr);
        i++;
        fleet.push({ ship: Ship(length), coordinates: coordinates });
      }
      attempts++;
    }
    let sum = getSumTotalSegments();

    return { sum, attempts };
  }

  function placeShip(length, coordinates, orientation) {
    let x = coordinates[0];
    let y = coordinates[1];
    let shipCoordinates = [];
    if (orientation == "horizontal") {
      for (let i = 0; i < length; i++) {
        board[y][x + i] = 1;
        shipCoordinates.push([x + i, y]);
      }
    }
    if (orientation == "vertical") {
      for (let j = 0; j < length; j++) {
        board[y + j][x] = 1;
        shipCoordinates.push([x, y + j]);
      }
    }
    return shipCoordinates;
  }

  function checkArrayExistsinArray(parentArr, myArr) {
    for (let i in parentArr) {
      let childArr = parentArr[i];
      let returnThis = false;
      for (let j in childArr) {
        if (childArr[j] == myArr[j]) {
          returnThis = true;
        } else {
          returnThis = false;
          break;
        }
      }
      if (returnThis == true) {
        return i;
      }
    }
    return -1;
  }

  function registerHitOnBoard(coordinates) {
    // console.log("HIT REGISTERED on board at " + coordinates);
    let x = coordinates[0];
    let y = coordinates[1];
    board[y][x] = "X";
  }

  function registerHitOnShip(coordinates) {
    // console.log("HIT REGISTERED at " + coordinates);

    for (let i = 0; i < fleet.length; i++) {
      let ship = fleet[i];
      // let arr = item.coordinates;
      let hitPosition = checkArrayExistsinArray(ship.coordinates, coordinates);
      if (hitPosition >= 0) {
        // console.log(ship.ship.getHealth());
        ship.ship.hit(hitPosition);
        if (ship.ship.isSunk()) {
          // console.log("a ship has sunk lol");
        }
        // console.log(ship.ship.getHealth());
        // console.log(hitPosition);
        // console.log(ship.coordinates);
        // console.log(coordinates);
        // console.log(ship.ship);
      }
    }
  }

  function checkPosition(coordinates) {
    let x = coordinates[0];
    let y = coordinates[1];
    if (board[y][x] == 1) {
      return "hit";
    } else if (board[y][x] == 0) {
      return "miss";
    } else {
      return "illegal move";
    }
  }

  function receiveAttack(coordinates) {
    let x = coordinates[0];
    let y = coordinates[1];
    if (board[y][x] == 1) {
      registerHitOnShip(coordinates);
      registerHitOnBoard(coordinates);
      return "hit";
    } else if (board[y][x] == 0) {
      board[y][x] = "O";
      return "miss";
    } else {
      return "illegal move";
    }
  }

  function allSunk() {
    ////check if all boats are sunk
    return fleet.every((item) => item.ship.isSunk() == true);
  }

  return {
    allSunk,
    receiveAttack,
    registerHitOnShip,
    registerHitOnBoard,
    generateShips,
    placeShip,
    randomOrientation,
    randomCoordinate,
    getSumTotalSegments,
    validShipPlacement,
    getBoard,
    getFleet,
    checkArrayExistsinArray,
    checkPosition,
    getData,
  };
};

const game = Gameboard();
game.generateShips();
// console.log(game.getBoard());
// console.log("okay");
// console.log(game.getBoard());

// module.exports = Gameboard;
export default Gameboard;
