const boxs = document.querySelectorAll(".box");
const txt = document.querySelector("#status");
const restart = document.querySelector("#restart");
let x = "X";
let o = "O";

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;
init();

function init() {
  boxs.forEach((box) => box.addEventListener("click", boxClick));
  restart.addEventListener("click", restartGame);
  txt.textContent = `${player} Your Turn`;
  running = true;
}

function boxClick() {
  const index = this.dataset.index;
  if (options[index] != "" || !running) {
    return;
  }
  updateBox(this, index);
  checkWinner();
}

function updateBox(box, index) {
  options[index] = player;
  box.innerHTML = currentPlayer;
}

function changePlayer() {
  player = player == "X" ? "O" : "X";
  currentPlayer = currentPlayer == x ? o : x;
  txt.textContent = `${player} Your Turn`;
}

function checkWinner() {
  let isWon = false;
  for (let i = 0; i < win.length; i++) {
    const condition = win[i]; //[0,1,2]
    const box1 = options[condition[0]]; //x
    const box2 = options[condition[1]]; //''
    const box3 = options[condition[2]]; //''
    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }
    if (box1 == box2 && box2 == box3) {
      isWon = true;
      boxs[condition[0]].classList.add("win");
      boxs[condition[1]].classList.add("win");
      boxs[condition[2]].classList.add("win");
    }
  }

  if (isWon) {
    txt.textContent = `${player} Won the game 😎`;
    let audio = new Audio("wonGame.mpeg");
    audio.play();
    // alert(`${player} won the game`);
    running = false;
  } else if (!options.includes("")) {
    txt.textContent = `Game Draw.!!`;
    let audio = new Audio("tieGame.mpeg");
    audio.play();
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = x;
  player = "X";
  running = true;
  txt.textContent = `${player} Your Turn`;

  boxs.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("win");
  });
}
