// Creating Boxes
let boxCont = document.querySelector(".box-con");
let icons = [
  "Snake",
  "Rat",
  "rooster",
  "Dragon",
  "Dog",
  "sheep",
  "horse",
  "Rabbit2",
];
let colors = {
  Snake: "#19933c",
  Rat: "#1d1d28",
  rooster: "#3f282f",
  Dragon: "#c03839",
  Dog: "#c9c9c9",
  sheep: "#93f6c8",
  horse: "#9492f1",
  Rabbit2: "#8f3091",
};
for (let i = 0; i < 16; i++) {
  let box = document.createElement("div");
  box.setAttribute("class", "box");
  box.classList.add("prevent-clicking");
  boxCont.appendChild(box);
  let frontBox = document.createElement("div");
  frontBox.classList.add("face", "front");
  box.appendChild(frontBox);
  let backBox = document.createElement("div");
  backBox.classList.add("face", "back");
  box.appendChild(backBox);
  let icon = document.createElement("i");
  backBox.appendChild(icon);
}
let boxes = document.querySelectorAll(".box");
let startBtn = document.querySelector(".start-game");
// Choosing Random Number
function choosingRandomNumber(length) {
  let randomNum = Math.floor(Math.random() * length);
  return randomNum;
}
// Shuffling The images
function shuffling() {
  // let backboxes = document.querySelectorAll(".back");
  let allIcons = document.querySelectorAll("i");
  let iconNum = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
  for (let i = 0; i < 16; i++) {
    allIcons[i].removeAttribute("class");
    boxes[i].removeAttribute("id");
    let randomNum = choosingRandomNumber(iconNum.length);
    allIcons[i].classList.add(`icon-${icons[iconNum[randomNum]]}`);
    let color = colors[icons[iconNum[randomNum]]];
    boxes[i].style.cssText = `color:${color}`;
    boxes[i].setAttribute("data-num", iconNum[randomNum]);
    boxes[i].setAttribute("data-animal", icons[iconNum[randomNum]]);
    iconNum.splice(randomNum, 1);
  }
}
// Input Player Name
window.onload = function () {
  document.querySelector("input").style.cssText = `margin:0;`;
};
let input = document.querySelector("input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    input.style.display = "none";
    document.querySelector(".welcome-screen").style.display = "none";
    document.querySelector(".name").textContent = `Name : ${input.value}`;
  }
});

// Prevent Flipping A Box
function preventClicking() {
  document.querySelector(".box-con").classList.add("prevent-clicking");
  setTimeout(() => {
    document.querySelector(".box-con").classList.remove("prevent-clicking");
  }, 1000);
}

// flip box func
function flip(box) {
  // flip box
  box.classList.add("flip");
  box.id = "flipped";
  let flippedBoxes = document.querySelectorAll("#flipped");
  if (flippedBoxes.length === 2) {
    // Increasing Moves
    let numberOfMoves = +document
      .querySelector(".moves")
      .getAttribute("data-moves");
    document.querySelector(".moves").textContent = `Moves : ${
      numberOfMoves + 1
    }`;
    document
      .querySelector(".moves")
      .setAttribute("data-moves", numberOfMoves + 1);
    // prevent clicking for each 2 cards
    preventClicking();
    if (
      flippedBoxes[0].getAttribute("data-num") ==
      flippedBoxes[1].getAttribute("data-num")
    ) {
      flippedBoxes.forEach((box) => {
        box.id = "correct";
        box.classList.add("prevent-clicking");
        box.classList.add(`${box.getAttribute("data-animal")}-glow`);
        if (document.querySelectorAll("#correct").length === boxes.length) {
          let startBtn = document.querySelector(".start-game");
          startBtn.textContent = "Play Again";
          startBtn.addEventListener("click", startGame);
        }
      });
    } else {
      setTimeout(function () {
        flippedBoxes.forEach((box) => {
          box.classList.remove("flip");
          box.removeAttribute("id");
        });
      }, 1000);
    }
  }
}

// Starting Game func
function startGame() {
  boxes.forEach(function (box) {
    box.classList.remove(`${box.getAttribute("data-animal")}-glow`);
  });
  // shuffling the images
  shuffling();

  // Reseting Moves
  document.querySelector(".moves").setAttribute("data-moves", "0");
  document.querySelector(".moves").textContent = `Moves : ${document
    .querySelector(".moves")
    .getAttribute("data-moves")}`;
  // remove prevent click
  boxes.forEach((box) => {
    box.classList.remove("prevent-clicking");
  });
  // Flip Cards For 3 Sec
  boxes.forEach(function (box) {
    box.classList.add("flip");
  });
  // unflip all the cards when starting the game
  setTimeout(function () {
    boxes.forEach(function (box, i) {
      setTimeout(
        function () {
          box.classList.remove("flip");
        },
        100 * i,
        box
      );
    });
  }, 3000);
  startBtn.removeEventListener("click", startGame);
}

// Start Game
startBtn.addEventListener("click", startGame);
boxes.forEach((box) => {
  box.addEventListener("click", function () {
    flip(box);
  });
});
