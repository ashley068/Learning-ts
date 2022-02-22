let secretNumber: number = Math.floor(Math.random() * 20) + 1;
let score: number = 20;
let highscore: number = 0;
//element
const messageShowing = document.querySelector('.message')! as HTMLElement;
const checkBtn = document.querySelector('.check');
const bodyColor = document.querySelector('body')! as HTMLElement;
const numWidth = document.querySelector('.number')! as HTMLElement;
const correctNum = document.querySelector('.number')! as HTMLElement;
const highscoreRecord = document.querySelector('highscore')! as HTMLElement;
const scoreRecord = document.querySelector('.score')! as HTMLElement;
const againBtn = document.querySelector('.again')! as HTMLButtonElement;
const guess = document.querySelector('.guess')! as HTMLInputElement;
//message displaying

const displayMessage = (message: string): void => {
  messageShowing.textContent = message;
};

//clicking 'check' button
checkBtn?.addEventListener('click', function (): void {
  if (!+guess.value) {
    displayMessage('No number!');
  } else if (+guess.value === secretNumber) {
    displayMessage('Correct Number!');

    bodyColor.style.backgroundColor = '#60b347';

    numWidth.style.width = '30rem';

    correctNum.textContent = secretNumber.toString();

    //updating highest score
    if (score > highscore) {
      highscore = score;

      highscoreRecord.textContent = highscore.toString();
    }
  } else if (+guess.value != secretNumber) {
    if (score > 1) {
      displayMessage(+guess.value > secretNumber ? 'Too high' : 'Too low');
      score--;
      scoreRecord.textContent = score.toString();
    } else {
      displayMessage('You lost the game!');
      scoreRecord.textContent = '0';
    }
  }
});

againBtn.addEventListener('click', () => {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  displayMessage('Start guessing...');
  bodyColor.style.backgroundColor = '#222';
  numWidth.style.width = '15rem';
  correctNum.textContent = '?';
  guess.textContent = '';
  scoreRecord.textContent = '20';
});
