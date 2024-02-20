"use strict"

//* I pick up all the HTML elements I need

//---------------------------------------------

/**
 * @type {HTMLDivElement}
 */
const grid = document.querySelector(".grid") ?? document.createElement("div");

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

    if(isRowEven && isCellEven || !isRowEven && !isCellEven ) {
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

            if(squareContent !== "") {
                square.classList.add(squareContent);
            };

            if(riverRows.includes(rowIndex)) {
                square.classList.add("river");
            } else if(roadRows.includes(rowIndex)) {
                square.classList.add("road");
            }else {
                getChessBoard(square, rowIndex, squareIndex)
            };

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

switch(event.key) {
    case "ArrowUp":
        if(duckPosition.y > 0) duckPosition.y--;
        break;
    case "ArrowDown":
        if(duckPosition.y < (gridMatrix.length - 1)) duckPosition.y++;
        break;
    case "ArrowLeft":
        if(duckPosition.x > 0) duckPosition.x--;
        break;
    case "ArrowRight":
        if(duckPosition.x < (gridMatrix.length - 1)) duckPosition.x++;
        break;
}

redrawGrid();

};

function redrawGrid() {
    placeDuck();
    drawGrid();
    console.table(gridMatrix);
}

document.addEventListener("keyup", moveDuck);

redrawGrid();