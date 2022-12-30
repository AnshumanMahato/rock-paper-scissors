//jshint esversion:8
const game = {
  playerChoice: undefined,
  opponentChoice: undefined,
  score: 0,
};

const wait = async (sec) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), sec * 1000);
  });
};

//initialize
const gameOptions = ['scissors', 'paper', 'rock', 'lizard', 'spock'];
const scoreElememt = document.querySelector('.score__value');
scoreElememt.textContent = game.score;

const selectionWindow = document.querySelector('.selection-window');
const resultWindow = document.querySelector('.result-window');
const playerChip = resultWindow.querySelector('.choice__player>.chip');
const compChip = resultWindow.querySelector('.choice__opponent>.chip');
const displayResult = resultWindow.querySelector('.result');
const resultText = displayResult.querySelector('span');
const btnPlayAgain = displayResult.querySelector('.btn--play-again');

selectionWindow.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('chip')) return;
  console.log(e.target);

  //reset screens
  selectionWindow.classList.toggle('hide');
  if (game.playerChoice !== undefined)
    playerChip.classList.remove(`chip--${gameOptions[game.playerChoice]}`);
  if (game.opponentChoice !== undefined)
    compChip.classList.remove(`chip--${gameOptions[game.opponentChoice]}`);

  //Get user selection
  game.playerChoice = parseInt(e.target.dataset.option);
  playerChip.classList.add(`chip--${gameOptions[game.playerChoice]}`);
  resultWindow.classList.toggle('hide');

  await wait(1);
  //genrerate a random opponent selection
  game.opponentChoice = Math.floor(Math.random() * 5);
  compChip.classList.add(`chip--${gameOptions[game.opponentChoice]}`);

  //Evaluate
  if (game.playerChoice === game.opponentChoice) {
    resultText.textContent = 'DRAW';
  } else if (
    (game.playerChoice + 1) % 5 === game.opponentChoice ||
    (game.playerChoice + 3) % 5 === game.opponentChoice
  ) {
    resultText.textContent = 'YOU WIN';
    game.score++;
  } else {
    resultText.textContent = 'YOU LOSE';
    game.score--;
  }

  //Display Result
  await wait(1);
  scoreElememt.textContent = game.score;
  resultWindow.classList.remove('result-pending');
  resultWindow.classList.add('result-declared');
  displayResult.classList.toggle('hide');
});

btnPlayAgain.addEventListener('click', (e) => {
  displayResult.classList.toggle('hide');
  resultWindow.classList.add('result-pending');
  resultWindow.classList.remove('result-declared');
  resultWindow.classList.toggle('hide');
  selectionWindow.classList.toggle('hide');
});
/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
if (elem.requestFullscreen) {
  elem.requestFullscreen();
} else if (elem.webkitRequestFullscreen) {
  /* Safari */
  elem.webkitRequestFullscreen();
} else if (elem.msRequestFullscreen) {
  /* IE11 */
  elem.msRequestFullscreen();
}
