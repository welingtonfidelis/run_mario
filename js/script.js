const mario = document.querySelector('.mario');
const marioGameOver = document.querySelector('.mario-game-over');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
const gameOverBoard = document.querySelector('.game-over-board');

let loop;
const startGame = () => {
  console.log('start');
  loop = setInterval(() => {
    console.log('looping');

    const pipePosition = pipe.offsetLeft;
    const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''));

    if (pipePosition <= 100 && pipePosition > 20 && marioPosition < 80) {
      console.log('morremo');
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

const resetGame = () => {
  pipe.style.animation = 'pipe-animation 1.5s infinite linear';
  pipe.style.left = '';

  mario.style.display = '';
      
  marioGameOver.style.display = 'none';

  gameBoard.classList.remove('game-board-game-over'); 

  gameOverBoard.style.display = 'none';

  startGame();
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