/*----- constants -----*/
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


/*----- app's state (variables) -----*/
let board; //Array that holds the current state of the game board
let gameStatus; // 'X' -> X wins, 'O' -> O wins, 'null' -> no one has won, 'cat' -> cat game
let playerTurn; // 'xTurn' -> player X's turn, 'yTurn' -> player Y's turn
const winTotals = {
    X: 0,
    O: 0
}
// let emptySquares; //Array that counts the number of turns remaining

/*----- cached element references -----*/
const squares = document.getElementsByClassName('space');
const sqArea = document.querySelector('section');
const footerMsg = document.querySelector('footer');
const playAgain = document.querySelector('button');

/*----- event listeners -----*/
sqArea.addEventListener('click', handleSquareClick);
playAgain.addEventListener('click', init)


/*----- functions -----*/
init();

function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameStatus = null;
    playerTurn = 'X';
    playAgain.style.visibility = 'hidden';
    sqArea.style.filter = 'blur(0)'
    render();
}





function handleSquareClick(evt) {
    //Ignore button click if square has already been pressed
    if (evt.target.innerText !== '') return;
    if (gameStatus !== null) {
        render();
        return;
    }
    //Grab index of clicked element, then assign X or O to that position in the board array 
    const idx = [...this.children].indexOf(evt.target);
    board[idx] = playerTurn;
    checkWin();
    render();
}

function checkWin() {
    // Check if either player wins
    winCombos.forEach(function (combo) {
        if (board[combo[0]] === playerTurn && board[combo[1]] === playerTurn && board[combo[2]] === playerTurn) gameStatus = playerTurn;
    })

    // if either player wins, add one to their total number of wins
    if (gameStatus !== null) winTotals[gameStatus] += 1;

    // Check if cat game
    if (!board.includes('') && gameStatus === null) gameStatus = 'cat';

    // If game status is still null, flip player turn
    if (gameStatus === null) playerTurn = (playerTurn === 'X') ? 'O' : 'X';
}



// RENDER FUNCTIONS!!!!

function render() {
    renderMsg();
    renderButton();
    renderSquares();
}

function renderButton() {
    if (gameStatus !== null) {
        document.querySelector('section').style.filter = 'blur(6px)';
        playAgain.style.visibility = 'visible';
    }
}

function renderMsg() {
    if (gameStatus === null) { footerMsg.innerText = (`X Wins: ${winTotals.X} \u00A0 \u00A0 | \u00A0 \u00A0 ${playerTurn}'s turn \u00A0 \u00A0 | \u00A0 \u00A0 O Wins: ${winTotals.O}`) }
    else if (gameStatus === 'cat') { footerMsg.innerText = (`Cat game!`) }
    else { (footerMsg.innerText = `${gameStatus} wins!`) };
}

function renderSquares() {
    for (let i = 0; i <= 8; i++) {
        squares[i].innerText = board[i];
    }
}
