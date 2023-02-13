// variables
let watcherRerender = true;
let isGameStart = true;
let humanChosenWeapon = "rock";
let botChosenWeapon = "rock";
let recordData = [];

// some animation
function animationBackground() {
  setTimeout(() => {
    confetti();
  }, 1000);
}

// getter
// for some reason this is global and we can also pass an arg, haha
// function getStore() {
//   return { isGameStart, humanChosenWeapon };
// }

// computed
function toggleGameStart() {
  isGameStart = !isGameStart;
  watcherRerender = true;
}
function generateBotWeapon() {
  let randomNumber = Math.floor(Math.random() * 3) + 1;

  botChosenWeapon =
    (randomNumber === 1 && "rock") ||
    (randomNumber === 2 && "scissor") ||
    (randomNumber === 3 && "paper");
}
function whoWin() {
  const getNumber = (weapon) => {
    if (weapon === "rock") {
      return 1;
    }
    if (weapon === "scissor") {
      return 2;
    }
    return 3;
  };
  const currentResult = () => {
    if (getNumber(humanChosenWeapon) === getNumber(botChosenWeapon)) {
      return "draw";
    }
    // rock < scissor < paper
    if (
      getNumber(humanChosenWeapon) === 3 &&
      getNumber(botChosenWeapon) === 1
    ) {
      animationBackground();
      return "humanWin";
    }
    if (
      getNumber(humanChosenWeapon) === 1 &&
      getNumber(botChosenWeapon) === 3
    ) {
      return "botWin";
    }
    if (getNumber(humanChosenWeapon) < getNumber(botChosenWeapon)) {
      animationBackground();
      return "humanWin";
    }
    return "botWin";
  };
  recordData = [
    ...recordData,
    { bot: botChosenWeapon, human: humanChosenWeapon, result: currentResult() },
  ];
}

// click events
function button(t) {
  // so what happen here that, when using event and you click the svg it will target the svg but using this keyword then its absolute
  humanChosenWeapon = t.dataset.value;
  generateBotWeapon();
  toggleGameStart();

  whoWin();
  // to play it again, and also it will cause to render twice
  setTimeout(() => {
    toggleGameStart();
  }, 2000);
}
