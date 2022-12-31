//jshint esversion:8
const game = {
  playerChoice: undefined,
  compChoice: undefined,
  currWinner: undefined,
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
  if (game.compChoice !== undefined)
    compChip.classList.remove(`chip--${gameOptions[game.compChoice]}`);

  //Get user selection
  game.playerChoice = parseInt(e.target.dataset.option);
  playerChip.classList.add(`chip--${gameOptions[game.playerChoice]}`);
  resultWindow.classList.toggle('hide');

  await wait(1);
  //genrerate a random opponent selection
  game.compChoice = Math.floor(Math.random() * 5);
  compChip.classList.add(`chip--${gameOptions[game.compChoice]}`);

  //Evaluate
  if (game.playerChoice === game.compChoice) {
    resultText.textContent = 'DRAW';
    game.currWinner = undefined;
  } else if (
    (game.playerChoice + 1) % 5 === game.compChoice ||
    (game.playerChoice + 3) % 5 === game.compChoice
  ) {
    resultText.textContent = 'YOU WIN';
    game.score++;
    game.currWinner = 'player';
  } else {
    resultText.textContent = 'YOU LOSE';
    game.score--;
    game.currWinner = 'comp';
  }

  //Display Result
  await wait(1);
  scoreElememt.textContent = game.score;
  resultWindow.classList.remove('result-pending');
  resultWindow.classList.add('result-declared');
  displayResult.classList.toggle('hide');

  if (game.currWinner === 'player') {
    playerChip.querySelector('.winner').classList.remove('hide');
  }
  if (game.currWinner === 'comp') {
    compChip.querySelector('.winner').classList.remove('hide');
  }
});

btnPlayAgain.addEventListener('click', (e) => {
  displayResult.classList.toggle('hide');
  resultWindow.classList.add('result-pending');
  resultWindow.classList.remove('result-declared');
  resultWindow.classList.toggle('hide');
  selectionWindow.classList.toggle('hide');
  if (game.currWinner === 'player') {
    playerChip.querySelector('.winner').classList.add('hide');
  }
  if (game.currWinner === 'comp') {
    compChip.querySelector('.winner').classList.add('hide');
  }
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
