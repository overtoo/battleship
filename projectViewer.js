import gamePlay from "./gamePlay.js";

const projectViewer = (() => {
  function render() {
    renderBoard(gamePlay.playerOne);
    renderBoard(gamePlay.playerTwo);
    disableClicks(gamePlay.playerOne);
    disableClicks(gamePlay.playerTwo);
    allowClicks(gamePlay.playerOne);
    allowClicks(gamePlay.playerTwo);
    showData();
    // renderPlayerTurn(gamePlay.playerTwo);
    // renderPlayerTurn(gamePlay.playerOne);
    // allowClicks(gamePlay.playerOne);
    // allowClicks(gamePlay.playerTwo);
    // activateAttackerDefender(gamePlay.playerOne, gamePlay.playerTwo);
  }

  //   function renderPlayerTurn(player) {
  //     if (player.isTurn) {
  //       //   console.log(player);
  //       const displayActivePlayer = document.querySelector(`#activePlayer`);
  //       displayActivePlayer.textContent = player.type;
  //     }
  //   }

  function showData() {
    //   console.log(player);
    const playerOneData = document.querySelector(`[data-player-info='${1}']`);
    const playerTwoData = document.querySelector(`[data-player-info='${2}']`);
    playerOneData.textContent =
      gamePlay.playerOne.game.getData().hitCount +
      "/" +
      gamePlay.playerOne.game.getData().total;
    playerTwoData.textContent =
      gamePlay.playerOne.game.getData().hitCount +
      "/" +
      gamePlay.playerTwo.game.getData().total;
  }

  function renderBoard(player) {
    let playerNumber = player.getPlayerNumber();
    const board = document.querySelector(`[data-player='${playerNumber}']`);
    board.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let rows = player.game.getBoard();
        let square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = i;
        square.dataset.column = j;
        square.classList.add("noselect");
        let text = rows[i][j];
        // if (text == "0") {
        //   square.classList.add("empty");
        // }
        if (text == "1" && player.type == "human") {
          square.classList.add("boat");
        }
        if (text == "O") {
          square.classList.add("miss");
        }
        if (text == "X") {
          square.classList.add("hit");
        }
        board.appendChild(square);
      }
    }
  }
  //   function renderBoardTwo() {
  //     const board = document.querySelector(`[data-player='2']`);
  //     for (let i = 0; i < 10; i++) {
  //       for (let j = 0; j < 10; j++) {
  //         let rows = gamePlay.playerTwo.game.getBoard();
  //         let square = document.createElement("div");
  //         square.classList.add("square");
  //         square.dataset.row = i;
  //         square.dataset.column = j;
  //         square.textContent = rows[i][j];
  //         board.appendChild(square);
  //       }
  //     }
  //   }

  function disableClicks(player) {
    let playerNumber = player.getPlayerNumber();
    let squares = document.querySelectorAll(
      `[data-player="${playerNumber}"] > .square`
    );
    squares.forEach((square) => {
      square.removeEventListener("click", (event) => {});
    });
  }

  function allowClicks(player) {
    if (!player.isTurn) {
      //   console.log(player);
      let playerNumber = player.getPlayerNumber();
      console.log(playerNumber + " ENABLED");
      //   console.log(playerNumber);

      // window.addEventListener("test", null,);
      let squares = document.querySelectorAll(
        `[data-player="${playerNumber}"] > .square`
      );
      squares.forEach((square) => {
        square.addEventListener("click", (event) => {
          let row = parseInt(square.getAttribute("data-row"));
          let column = parseInt(square.getAttribute("data-column"));
          gamePlay.turn([column, row]);
          //   renderBoard(gamePlay.playerOne);
          //   renderBoard(gamePlay.playerTwo);
          render();
          //   activateAttackerDefender(defender, attacker);
        });
      });
    }
  }

  //   function activateAttackerDefender(attacker, defender) {
  //     let defenderNumber = defender.getPlayerNumber();
  //     let squares = document.querySelectorAll(
  //       `[data-player="${defenderNumber}"] > .square`
  //     );
  //     squares.forEach((square) => {
  //       square.addEventListener("click", () => {
  //         let row = parseInt(square.getAttribute("data-row"));
  //         let column = parseInt(square.getAttribute("data-column"));
  //         console.log([column, row]);
  //         attacker.attack([column, row], defender);
  //         renderBoard(defender);
  //         activateAttackerDefender(defender, attacker);
  //       });
  //     });
  //   }
  return {
    render,
  };
})();

export default projectViewer;
