// const Gameboard = require("./gameboard");
import Gameboard from "./Gameboard.js";

const Player = (number, type) => {
  let isTurn = false;
  const getPlayerNumber = () => number;
  const game = Gameboard();
  game.generateShips();

  // let lastMoveLegal = false;

  const attack = (coordinates, enemy) => {
    // let result = enemy.game.checkPosition(coordinates);
    if (type == "computer") {
      let computerMiss = false;
      let result;
      while (computerMiss == false) {
        let randomCoordinates = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ];
        console.log(
          "COMPUTER RANDOM COORDIANTES ARE" +
            randomCoordinates[0] +
            randomCoordinates[1]
        );

        if (enemy.game.checkPosition(randomCoordinates) == "miss") {
          console.log("Computer missed.");
          result = enemy.game.receiveAttack(randomCoordinates);
          computerMiss = true;
          return result;
        } else {
          console.log("Computer hit you.");
          result = enemy.game.receiveAttack(randomCoordinates);
        }
        break;
      }
      return result;
    }
    if (type == "human") {
      let result = enemy.game.receiveAttack(coordinates);
      return result;
    }
  };

  const isDead = () => {
    return game.allSunk();
    // console.log(allSunk());
  };

  return {
    isDead,
    isTurn,
    game,
    attack,
    type,
    // turnResult,
    // lastMoveLegal,
    getPlayerNumber,
  };
};

// module.exports = Player;
export default Player;
