// Tic Tac Toe Game Logic
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'x';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const messages = {
  playerTurn: (player) => `Player ${player.toUpperCase()}'s turn`,
  win: (player) => `Player ${player.toUpperCase()} wins!`,
  draw: "Game ended in a draw!"
};

// Initialize game
function initGame() {
  statusText.textContent = messages.playerTurn(currentPlayer);
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.classList.remove('x', 'o');
  });
}

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = [...cells].indexOf(cell);

  if (gameState[cellIndex] !== '' || !gameActive) return;

  updateCell(cell, cellIndex);
  checkGameResult();
}

function updateCell(cell, index) {
  gameState[index] = currentPlayer;
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer.toUpperCase();
}

function checkGameResult() {
  let gameWon = false;

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameWon = true;
      break;
    }
  }

  if (gameWon) {
    statusText.textContent = messages.win(currentPlayer);
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = messages.draw;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  statusText.textContent = messages.playerTurn(currentPlayer);
}

function restartGame() {
  currentPlayer = 'x';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = messages.playerTurn(currentPlayer);
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
  });
}

// Event Listeners
restartBtn.addEventListener('click', restartGame);

// Initialize the game when the page loads
initGame();