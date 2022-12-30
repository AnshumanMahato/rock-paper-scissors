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

selectionWindow.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('chip')) return;
  console.log(e.target);

  //reset screens
  selectionWindow.classList.toggle('hide');
  if (game.playerChoice)
    playerChip.classList.remove(`chip--${game.playerChoice}`);
  if (game.opponentChoice)
    compChip.classList.remove(`chip--${game.opponentChoice}`);

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
    console.log('draw');
  } else if (
    (game.playerChoice + 1) % 5 === game.opponentChoice ||
    (game.playerChoice + 3) % 5 === game.opponentChoice
  ) {
    console.log('player win');
  } else {
    console.log('player lose');
  }
});
