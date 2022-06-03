const mario = document.querySelector('.mario');
const marioGameOver = document.querySelector('.mario-game-over');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
const gameOverBoard = document.querySelector('.game-over-board');
const resetGameButton = document.querySelector('#reset-game-button');

let loop;
const startGame = () => {
  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''));

    if (pipePosition <= 80 && pipePosition > 10 && marioPosition < 70) {
      pipe.style.animation = 'none';
      pipe.style.left = `${pipePosition}px`;
      
      mario.style.display = 'none';
      
      marioGameOver.style.display = 'block';
      marioGameOver.style.bottom = `${marioPosition}px`;

      gameBoard.classList.add('game-board-game-over');

      gameOverBoard.style.display = 'flex';

      clearInterval(loop);
    }
  }, 10);
};

let seconds = 3;
let secondsLoop;
const countSecondsToRestart = () => {
  console.log('second', seconds);
  
  resetGameButton.style.pointerEvents = 'none';
  resetGameButton.textContent = String(seconds);

  seconds -= 1;
  secondsLoop = setTimeout(countSecondsToRestart, 1000);
}

const resetGame = async () => {
  countSecondsToRestart();

  setTimeout(() => {
    console.log('count');
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = '';
  
    mario.style.display = '';
        
    marioGameOver.style.display = 'none';
  
    gameBoard.classList.remove('game-board-game-over'); 
  
    gameOverBoard.style.display = 'none';

    resetGameButton.style.pointerEvents = '';
    resetGameButton.textContent = 'SIM';
  
    clearTimeout(secondsLoop);
    seconds = 3;
    startGame();
    
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