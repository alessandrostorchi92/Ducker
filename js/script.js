"use strict"

//* I pick up all the HTML elements I need

//---------------------------------------------

/**
 * @type {HTMLDivElement}
 */
const grid = document.querySelector(".grid") ?? document.createElement("div");

/**
 * @type {[]}
 */
let randomGridMatrix = []

/**
 * @type {number[]}
 */
const riverRows = [1, 2];

/**
 * @type {number[]}
 */
const roadRows = [4, 5, 6];

//----------------------------------------------

//* I set up the random matrix of the grid.

function generateRandomMatrix() {
    
}

//* I create the matrix of the grid

/**
 * @type {Array<Array<string>>}
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

    gridMatrix.forEach((rowSquares, rowIndex) => {

        rowSquares.forEach((squareContent, squareIndex) => {

            const square = document.createElement("div");
            square.classList.add("square");
            console.dir(square);

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

}

drawGrid();