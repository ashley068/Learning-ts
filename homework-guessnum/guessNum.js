var secretNumber = Math.floor(Math.random() * 20) + 1;
var score = 20;
var highscore = 0;
//element
var messageShowing = document.querySelector('.message');
var checkBtn = document.querySelector('.check');
var bodyColor = document.querySelector('body');
var numWidth = document.querySelector('.number');
var correctNum = document.querySelector('.number');
var highscoreRecord = document.querySelector('highscore');
var scoreRecord = document.querySelector('.score');
var againBtn = document.querySelector('.again');
var guess = document.querySelector('.guess');
//message displaying
var displayMessage = function (message) {
    messageShowing.textContent = message;
};
//clicking 'check' button
checkBtn === null || checkBtn === void 0 ? void 0 : checkBtn.addEventListener('click', function () {
    if (!+guess.value) {
        displayMessage('No number!');
    }
    else if (+guess.value === secretNumber) {
        displayMessage('Correct Number!');
        bodyColor.style.backgroundColor = '#60b347';
        numWidth.style.width = '30rem';
        correctNum.textContent = secretNumber.toString();
        //updating highest score
        if (score > highscore) {
            highscore = score;
            highscoreRecord.textContent = highscore.toString();
        }
    }
    else if (+guess.value != secretNumber) {
        if (score > 1) {
            displayMessage(+guess.value > secretNumber ? 'Too high' : 'Too low');
            score--;
            scoreRecord.textContent = score.toString();
        }
        else {
            displayMessage('You lost the game!');
            scoreRecord.textContent = '0';
        }
    }
});
againBtn.addEventListener('click', function () {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    score = 20;
    displayMessage('Start guessing...');
    bodyColor.style.backgroundColor = '#222';
    numWidth.style.width = '15rem';
    correctNum.textContent = '?';
    guess.textContent = '';
    scoreRecord.textContent = '20';
});
