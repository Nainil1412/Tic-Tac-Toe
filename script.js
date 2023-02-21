const boxs = document.querySelectorAll(".box");
const turn = document.querySelector("#status");
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
  [2, 4, 6],
  [0, 4, 8],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let flag = false;
init();

function init() {
  boxs.forEach((box) => box.addEventListener("click", boxClick));
  restart.addEventListener("click", restartGame);
  turn.textContent = `${player} Your Turn`;
  flag = true;
}
function boxClick() {
  const index = this.dataset.index;
  // console.log(index)
  if (options[index] != "" || !flag) {
    return;
  }
  updateBox(this, index);
  checkWinner();
}


function changePlayer() {
  player = (player == "X") ? "0" : "X";
  currentPlayer = (currentPlayer == x) ? o : x;
  turn.txtContent = `${player} your turn`;
}
function checkWinner() {
  let isWon = false;
  for (let i = 0; i < win.length; i++) {
    const condition = win[i]; 
    const box1 = options[condition[0]]; 
    const box2 = options[condition[1]]; 
    const box3 = options[condition[2]];
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
    turn.textContent = `${player} Won the Game`;
    flag = false;
  } else if (!options.includes("")) {
    turn.textContent = `Game Draw...!`;
    flag = false;
  } else {
    changePlayer();
  }
}
function updateBox(box, index) {
  options[index] = player;
  box.innerHTML = currentPlayer;
}
function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = x;
  player = "X";
  flag = true;
  turn.textContent = `${player} Your Turn`;

  boxs.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("win");
  });
}

