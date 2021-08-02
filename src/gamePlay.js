// const Player = require("./Player");
import Player from "./Player.js";

const gamePlay = (() => {
  const playerOne = Player(1, "human");
  const playerTwo = Player(2, "computer");

  //player one goes first
  playerOne.isTurn = true;

  function turn(coordinates) {
    console.log("---------------------------");
    console.log(playerOne.game.getData());
    console.log(playerTwo.game.getData());
    let attacker;
    let defender;
    if (playerOne.isTurn) {
      attacker = playerOne;
      defender = playerTwo;
    } else {
      attacker = playerTwo;
      defender = playerOne;
    }
    let result = attacker.attack(coordinates, defender);
    if (result == "hit" && attacker.type == "computer") {
      turn();
    }
    if (result == "miss") {
      playerOne.isTurn = !playerOne.isTurn;
      playerTwo.isTurn = !playerTwo.isTurn;
    }
    if (result == "miss" && attacker.type == "human") {
      console.log("you missed, computers turn");
      turn();
    }
    if (result == "illegal move" && attacker.type == "computer") {
      turn();
    }

    if (playerOne.isDead() || playerTwo.isDead()) {
      alert("game over");
    }

    //autoplay computer
  }

  //   playerOne.attack([5, 0], playerTwo);
  //   playerOne.attack([3, 0], playerTwo);
  //   playerOne.attack([1, 0], playerTwo);
  //   playerTwo.attack([3, 3], playerOne);
  //   console.log(playerOne.game.getBoard());
  //   console.log(playerTwo.game.getBoard());

  return {
    playerOne,
    playerTwo,
    turn,
  };
})();

export default gamePlay;
