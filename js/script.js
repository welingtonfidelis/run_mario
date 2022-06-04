const mario = document.querySelector('.mario');
const marioGameOver = document.querySelector('.mario-game-over');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
const gameOverBoard = document.querySelector('.game-over-board');
const resetGameButton = document.querySelector('#reset-game-button');
const totalPoints = document.querySelector('#total-points');
const totalPointsResult = document.querySelector('#total-points-result');

let loop;
let secondsToRestart = 3;
let secondsToRestartLoop;
let points = 0;
let pointsLoop;

const countSecondsToRestart = () => {
  resetGameButton.style.pointerEvents = 'none';
  resetGameButton.textContent = String(secondsToRestart);
  
  secondsToRestart -= 1;
  secondsToRestartLoop = setTimeout(countSecondsToRestart, 1000);
}
const countPoints = () => {
  totalPoints.textContent = String(points);
  
  points += 1;
  pointsLoop = setTimeout(countPoints, 1500);
}

const startGame = () => {
  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''));

    
    if (pipePosition <= 80 && pipePosition > 10 && marioPosition < 70) {
      clearTimeout(pointsLoop);
      clearInterval(loop);

      pipe.style.animation = 'none';
      pipe.style.left = `${pipePosition}px`;
      
      mario.style.display = 'none';
      
      marioGameOver.style.display = 'block';
      marioGameOver.style.bottom = `${marioPosition}px`;

      gameBoard.classList.add('game-board-game-over');

      gameOverBoard.style.display = 'flex';

      totalPointsResult.textContent = String(points -1); 
    }
  }, 10);
};

const resetGame = async () => {
  countSecondsToRestart();

  setTimeout(() => {
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = '';
  
    mario.style.display = '';
        
    marioGameOver.style.display = 'none';
  
    gameBoard.classList.remove('game-board-game-over'); 
  
    gameOverBoard.style.display = 'none';

    resetGameButton.style.pointerEvents = '';
    resetGameButton.textContent = 'SIM';
  
    clearTimeout(secondsToRestartLoop);

    secondsToRestart = 3;
    points = 0;

    startGame();
    countPoints();
  }, 3000);
}

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');

  }, 500);
}

document.addEventListener('keydown', jump);
document.addEventListener('touchend', jump);

startGame();
countPoints();