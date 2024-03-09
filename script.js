let currentPlayer = 'Red';
let gameOver = false;
let output_message = document.getElementById('output_message');
let displayNextPlayer = document.getElementById("turn");
displayNextPlayer.textContent = `${currentPlayer}'s turn!`;
let board = [];
const noRows = 6, noColumns = 7;
let currentActiveLine = [5, 5, 5, 5, 5, 5, 5];
let slots = document.querySelectorAll(".cell");

for (let row = 0; row < noRows; ++row) {
    let line = [];
    for (let col = 0; col < noColumns; ++col) {
        line.push('');
        let cell = document.createElement('div');
        cell.id = row.toString() + '-' + col.toString();
        cell.classList.add('cell');
        cell.addEventListener('click', handleClick);
        document.getElementById('gameBoard').append(cell);
    }
    board.push(line);
}

function handleClick() {
    let row = this.id.split("-")[0];
    let col = this.id.split("-")[1];
    row = currentActiveLine[col];
    board[row][col] = currentPlayer;
    let cell = document.getElementById(row.toString() + '-' + col.toString());
    if (currentPlayer === 'Red') {
        cell.classList.add('red-token');
    } else {
        cell.classList.add('yellow-token');
    }
    currentPlayer = (currentPlayer === 'Red') ? 'Yellow' : 'Red';
    displayNextPlayer.textContent = `${currentPlayer}'s turn!`;
    currentActiveLine[col] -= 1;
    checkWin();
}

function checkWin() {
    checkTieGame();
    checkRow();
    checkColumn();
    checkDiagonals();
}

function checkRow() {
    for (let i = 0; i < noRows; ++i) {
        for (j = 0; j < noColumns - 3; ++j) {
            if (board[i][j] !== '' && board[i][j] === board[i][j + 1] && board[i][j + 1] === board[i][j + 2] && board[i][j + 2] === board[i][j + 3]) {
                handleGameOver();
                output_message.textContent = `Game over: ${board[i][j]} wins!`;
            }
        }
    }
}

function checkColumn() {
    for (let i = 0; i < noColumns; ++i) {
        for (let j = 0; j < noRows - 3; ++j) {
            if (board[j][i] !== '' && board[j][i] === board[j + 1][i] && board[j + 1][i] === board[j + 2][i] && board[j + 2][i] === board[j + 3][i]) {
                handleGameOver();
                output_message.textContent = `Game over: ${board[j][i]} wins!`;
            }
        }
    }
}

function checkDiagonals() {
    for (let i = 0; i < noRows - 3; ++i) {
        for (let j = 0; j < noColumns - 3; ++j) {
            if (board[i][j] !== '' && board[i][j] === board[i + 1][j + 1] && board[i + 1][j + 1] === board[i + 2][j + 2] && board[i + 2][j + 2] === board[i + 3][j + 3]) {
                handleGameOver();
                output_message.textContent = `Game over: ${board[i][j]} wins!`;
            }
        }
    }

    for (let i = 3; i < noColumns; ++i) {
        for (let j = 0; j < noColumns - 3; ++j) {
            if (board[i][j] != '' && board[i][j] === board[i - 1][j + 1] && board[i - 1][j + 1] === board[i - 2][j + 2] && board[i - 2][j + 2] === board[i - 3][j + 3]) {
                handleGameOver();
                output_message.textContent = `Game over: ${board[i][j]} wins!`;
            }
        }
    }
}

function checkTieGame() {
    let emptyCells = 0;
    for (let i = 0; i < noRows; ++i) {
        for (let j = 0; j < noColumns; ++j) {
            if (board[i][j] === '') {
                ++emptyCells;
            }
        }
    }
    if (emptyCells === 0) {
        handleGameOver();
        output_message.textContent = `Game over: it's a tie!`;
    }
}

function handleGameOver() {
    gameOver = true;
    displayNextPlayer.textContent = '';
    gameBoard.style.pointerEvents = "none";
}
