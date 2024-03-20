"use strict"

//* I pick up all the HTML elements I need

//---------------------------------------------

/**
 * @type {HTMLDivElement}
 */
const grid = document.querySelector(".grid") ?? document.createElement("div");

/**
 * @type {HTMLDivElement}
 */
const endGameScreen = document.querySelector('.end-game-screen') ?? document.createElement("div");

/**
 * @type {HTMLHeadingElement}
 */
const endGameText = document.querySelector('.end-game-text') ?? document.createElement("h2");

/**
 * @type {HTMLButtonElement}
 */
const playAgainButton = document.querySelector('.play-again') ?? document.createElement("button");

/**
 * @type {HTMLDivElement}
 */
const scoreCounter = document.querySelector('.score-counter') ?? document.createElement("div");

//----------------------------------------------

//* I create the matrix of the grid

/**
 * @type {string[][]}
 */
const gridMatrix = [
    ['', '', '', '', '', '', '', '', ''],
    ['river', 'wood', 'wood', 'river', 'wood', 'wood', 'river', 'river', 'wood'],
    ['wood', 'river', 'river', 'wood', 'wood', 'river', 'wood', 'wood', 'river'],
    ['', '', '', '', '', '', '', '', ''],
    ['road', 'bus', 'road', 'road', 'road', 'car', 'road', 'car', 'road'],
    ['bus', 'road', 'road', 'car', 'road', 'road', 'road', 'road', 'bus'],
    ['road', 'road', 'car', 'road', 'car', 'road', 'bus', 'road', 'road'],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']
];

//* I pick up all the grid elements I need

//----------------------------------------

/**
 * @type {number}
 */
const victoryRow = 0;

/**
 * @type {number[]}
 */
const riverRows = [1, 2];

/**
 * @type {number[]}
 */
const roadRows = [4, 5, 6];

/**
 * @type {Object}
 */
const duckPosition = {
    y: 8,
    x: 4
};

/**
 * @type {string}
 */
let contentBeforeDuck = "";

/**
 * @type {number}
 */
let timer = 15;

//-----------------------------------------

/**
 * This function creates the chessboard effect on the grid
 * @param {HTMLDivElement} cell 
 * @param {number} lineIndex
 * @param {number} cellIndex
 */
function getChessBoard(cell, lineIndex, cellIndex) {
    const isRowEven = lineIndex % 2 === 0;
    const isCellEven = cellIndex % 2 === 0;

    if (isRowEven && isCellEven || !isRowEven && !isCellEven) {
        cell.classList.add("square-dark");
    }

};

/**
 * This function draws the grid
 */
function drawGrid() {

    grid.innerHTML = "";

    gridMatrix.forEach((rowSquares, rowIndex) => {

        rowSquares.forEach((squareContent, squareIndex) => {

            const square = document.createElement("div");
            square.classList.add("square");
            //? console.dir(square);

            if (squareContent !== "") {
                square.classList.add(squareContent);
            };

            if (riverRows.includes(rowIndex)) {
                square.classList.add("river");
            } else if (roadRows.includes(rowIndex)) {
                square.classList.add("road");
            } else {
                getChessBoard(square, rowIndex, squareIndex)
            };

            if (rowIndex === 5 && (squareContent === "car" || squareContent === "bus")) {
                square.classList.add("reverse-icon");
            }

            grid.append(square);
        });
    });

};

/**
 * This function places the duck on the grid
 */
function placeDuck() {

    contentBeforeDuck = gridMatrix[duckPosition.y][duckPosition.x];
    gridMatrix[duckPosition.y][duckPosition.x] = "duck";

};

/**
 * This function moves the duck on the grid
 * @param {Object} event 
 */
function moveDuck(event) {

    gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

    switch (event.key) {
        case "ArrowUp":
            if (duckPosition.y > 0) duckPosition.y--;
            break;
        case "ArrowDown":
            if (duckPosition.y < (gridMatrix.length - 1)) duckPosition.y++;
            break;
        case "ArrowLeft":
            if (duckPosition.x > 0) duckPosition.x--;
            break;
        case "ArrowRight":
            if (duckPosition.x < (gridMatrix.length - 1)) duckPosition.x++;
            break;
        default:
            return;
    }

    redrawGrid();

};

/**
 * This function restarts the browser
 */
function playAgain() {
    document.location.reload();
}

document.addEventListener("keyup", moveDuck);
playAgainButton.addEventListener("click", playAgain);

/**
 * This function redesigns the game grid
 */
function redrawGrid() {
    placeDuck();
    checkDuckPosition();
    drawGrid();
    //? console.table(gridMatrix);
    //? console.log(contentBeforeDuck);
};

/**
 * This function sets up the end game conditions
 */
function checkDuckPosition() {
    if (duckPosition.y === victoryRow) {
        endGame("winner-duck");
    } else if ((contentBeforeDuck === "river")) {
        endGame("drowned-duck");
    } else if (contentBeforeDuck === "car" || contentBeforeDuck === "bus") {
        endGame("hit-duck");
    }
};

/**
 * This function clarifies why the ducker game comes to an end
 * @param {string} reason 
 */
function endGame(reason) {

    if (reason === "winner-duck") {
        endGameScreen.classList.remove("hidden");
        endGameScreen.classList.add("win");
        endGameText.innerHTML = "YOU<br>WIN";
        clearInterval(renderingLoop);
        clearInterval(countdown);
    } else {
        endGameScreen.classList.remove("hidden");
        clearInterval(renderingLoop);
        clearInterval(countdown);
    }

    document.removeEventListener("keyup", moveDuck);

    gridMatrix[duckPosition.y][duckPosition.x] = reason;

};

/**
 * This function moves right the rows of the grid
 * @param {Number} rowIndex 
 */
function moveRowRight(rowIndex) {
    const rowSquares = gridMatrix[rowIndex];
    //? console.log(rowSquares);
    const lastSquare = rowSquares.pop();
    //? console.log(rowSquares);

    if (lastSquare !== undefined) {
        rowSquares.unshift(lastSquare);
        //? console.log(rowSquares);
    }
};

/**
 * This function moves left the rows of the grid
 * @param {Number} rowIndex 
 */
function moveRowLeft(rowIndex) {
    const rowSquares = gridMatrix[rowIndex];
    //? console.log(rowSquares);
    const firstSquare = rowSquares.shift();
    //? console.log(rowSquares);

    if (firstSquare !== undefined) {
        rowSquares.push(firstSquare);
        //? console.log(rowSquares);
    }

};

/**
 * This function deals with the movement of the duck on the grid correctly.
 */
function handleDuckPosition() {
    gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

    if (contentBeforeDuck === "wood") {
        if (duckPosition.y === 1 && duckPosition.x < gridMatrix.length - 1) {
            duckPosition.x++;
        } else if (duckPosition.y === 2 && duckPosition.x > 0) {
            duckPosition.x--;
        }
    }

    contentBeforeDuck = gridMatrix[duckPosition.y][duckPosition.x];
};

const renderingLoop = setInterval(() => {

    handleDuckPosition();

    moveRowRight(1);
    moveRowLeft(2);
    moveRowRight(4);
    moveRowLeft(5);
    moveRowRight(6);

    redrawGrid();

}, 600);

/**
 * This function manages the countdown.
 */
function manageCountdown() {
    timer--;
    scoreCounter.textContent = timer.toString().padStart(2);
    //? console.log(timer);


    if (timer === 0) {
        endGame("time-up");
    }

}

redrawGrid();

const countdown = setInterval(manageCountdown, 1000);








