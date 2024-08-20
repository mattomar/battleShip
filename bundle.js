/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plaeyrs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plaeyrs.js */ \"./src/plaeyrs.js\");\n/* harmony import */ var _ships_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships.js */ \"./src/ships.js\");\n\n\nconst checkAllShipsSunk = (gameboard) => {\n    return gameboard.board.every(row => \n        row.every(cell => \n            cell === '.' || cell === 'H' || cell === 'M'\n        )\n    );\n};\ndocument.addEventListener('DOMContentLoaded', () => {\n    const player = new _plaeyrs_js__WEBPACK_IMPORTED_MODULE_0__.Player(10); // 10x10 grid\n    const computer = new _plaeyrs_js__WEBPACK_IMPORTED_MODULE_0__.Computer(10);\n    const messageCard = document.getElementById('message-card');\n \n    let lastClickTime = 0; // Timestamp of the last click\n\n    // Function to handle the player's turn\n    const handlePlayerTurn = () => {\n        const gridClass = 'computer-grid';\n\n        computer.gameboard.board.forEach((row, rowIndex) => {\n            row.forEach((cell, colIndex) => {\n                const cellId = `${gridClass}-cell-${rowIndex * computer.gameboard.size + colIndex}`;\n                const cellElement = document.getElementById(cellId);\n\n                if (cellElement) {\n                    cellElement.addEventListener('click', () => {\n                        const currentTime = Date.now();\n                        const timeSinceLastClick = currentTime - lastClickTime;\n\n                        // Check if 2 seconds have passed since the last click\n                        if (timeSinceLastClick < 2000) {\n                            console.log(\"Please wait before clicking again.\");\n                            return; // Prevent click if less than 2 seconds have passed\n                        }\n\n                        lastClickTime = currentTime; // Update last click time\n\n                        const cellContent = computer.gameboard.board[rowIndex][colIndex];\n\n                        if (cellContent === 'H' || cellContent === 'M') {\n                            console.log(\"This cell has already been attacked!\");\n                            return; // Prevent re-attacking the same cell\n                        }\n\n                        if (cellContent instanceof _ships_js__WEBPACK_IMPORTED_MODULE_1__.ship) {\n                            const attackedShip = cellContent;\n                            attackedShip.hit();\n\n                            cellElement.classList.add('hit-cell');\n                            computer.gameboard.board[rowIndex][colIndex] = 'H'; // Update board to mark hit\n                            console.log(\"Hit detected!\");\n\n                            if (attackedShip.isSunk()) {\n                                messageCard.textContent = \"Ship Destroyed!\";\n                                messageCard.classList.add('show');\n                                setTimeout(() => {\n                                    messageCard.classList.remove('show');\n                                }, 3000); // Hide the card after 3 seconds\n                            }\n                        } else {\n                            cellElement.classList.add('missed-cell');\n                            computer.gameboard.board[rowIndex][colIndex] = 'M'; // Update board to mark miss\n                            console.log(\"Miss detected!\");\n                        }\n\n                        // Check if all computer ships are sunk\n                        if (checkAllShipsSunk(computer.gameboard)) {\n                            messageCard.textContent = \"You won!\";\n                            messageCard.classList.add('show');\n                            return; // Stop the game if the player wins\n                        }\n\n                        // Wait 2 seconds before the computer's turn\n                        setTimeout(handleComputerTurn, 2000);\n                    });\n                } else {\n                    console.log(`Cell with ID ${cellId} not found.`);\n                }\n            });\n        });\n    };\n\n    // Function to handle the computer's turn\n    const handleComputerTurn = () => {\n        let rowIndex, colIndex;\n        do {\n            rowIndex = Math.floor(Math.random() * player.gameboard.size);\n            colIndex = Math.floor(Math.random() * player.gameboard.size);\n        } while (player.gameboard.board[rowIndex][colIndex] === 'H' || player.gameboard.board[rowIndex][colIndex] === 'M');\n\n        const cellContent = player.gameboard.board[rowIndex][colIndex];\n        const cellId = `player-grid-cell-${rowIndex * player.gameboard.size + colIndex}`;\n        const cellElement = document.getElementById(cellId);\n\n        if (cellContent instanceof _ships_js__WEBPACK_IMPORTED_MODULE_1__.ship) {\n            const attackedShip = cellContent;\n            attackedShip.hit();\n\n            cellElement.classList.add('hit-cell');\n            player.gameboard.board[rowIndex][colIndex] = 'H'; // Update board to mark hit\n            console.log(\"Computer hit detected!\");\n\n            if (attackedShip.isSunk()) {\n                messageCard.textContent = \"Your ship has been destroyed!\";\n                messageCard.classList.add('show');\n                setTimeout(() => {\n                    messageCard.classList.remove('show');\n                }, 3000); // Hide the card after 3 seconds\n            }\n        } else {\n            cellElement.classList.add('missed-cell');\n            player.gameboard.board[rowIndex][colIndex] = 'M'; // Update board to mark miss\n            console.log(\"Computer miss detected!\");\n        }\n\n        // Check if all player ships are sunk\n        if (checkAllShipsSunk(player.gameboard)) {\n            messageCard.textContent = \"Computer won!\";\n            messageCard.classList.add('show');\n            return; // Stop the game if the computer wins\n        }\n    };\n\n    const startButton = document.querySelector('.button button');\n\n    startButton.addEventListener('click', () => {\n        startButton.textContent = 'Restart Game'; // Change button text to 'Restart Game'\n        handlePlayerTurn(); // Call the function to handle the player's turn\n\n        // Add event listener for restarting the game\n        startButton.addEventListener('click', () => {\n            location.reload(); // Reload the page to restart the game\n        });\n    });\n \n\n});\n\n\n \n\n\n//# sourceURL=webpack://webpack-template/./src/index.js?");

/***/ }),

/***/ "./src/plaeyrs.js":
/*!************************!*\
  !*** ./src/plaeyrs.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Computer: () => (/* binding */ Computer),\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\n\n\n\n\n\n\nclass Player {\n    constructor(size) {\n        this.gameboard = new _ships__WEBPACK_IMPORTED_MODULE_0__.gameboard(size);\n        this.size = size;\n        this.initializeGrid(); // Initialize grid for player if needed\n        this.updateGrid();\n    }\n\n    initializeGrid() {\n        // This may be redundant if the grid is already initialized elsewhere\n        (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createGrid)('player-grid', () => {}); // Empty function as we handle clicks in the game logic\n    }\n\n    updateGrid() {\n        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.updateGridWithShips)(this.gameboard, 'player-grid');\n    }\n\n    receiveAttack(row, col) {\n        return this.gameboard.receiveAttack(row, col);\n    }\n\n    allShipsSunk() {\n        return this.gameboard.allShipsSunk();\n    }\n}\n\nclass Computer {\n    constructor(size) {\n        this.gameboard = new _ships__WEBPACK_IMPORTED_MODULE_0__.gameboard(size);\n        this.size = size;\n        this.initializeGrid(); // Initialize grid for computer if needed\n        this.updateGrid();\n    }\n\n    initializeGrid() {\n        // This may be redundant if the grid is already initialized elsewhere\n        (0,_ui__WEBPACK_IMPORTED_MODULE_1__.createGrid)('computer-grid', () => {}); // Empty function as we handle clicks in the game logic\n    }\n\n    updateGrid() {\n        (0,_ships__WEBPACK_IMPORTED_MODULE_0__.updateGridWithShips)(this.gameboard, 'computer-grid');\n    }\n\n    receiveAttack(row, col) {\n        return this.gameboard.receiveAttack(row, col);\n    }\n\n    allShipsSunk() {\n        return this.gameboard.allShipsSunk();\n    }\n}\n\n//# sourceURL=webpack://webpack-template/./src/plaeyrs.js?");

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkShipPlacements: () => (/* binding */ checkShipPlacements),\n/* harmony export */   gameboard: () => (/* binding */ gameboard),\n/* harmony export */   ship: () => (/* binding */ ship),\n/* harmony export */   updateGridWithShips: () => (/* binding */ updateGridWithShips)\n/* harmony export */ });\n   \n  class ship {\n    constructor(length) {\n        this.length = length;\n        this.hits = 0;\n    }\n\n    hit() {\n        if (this.hits < this.length) {\n            this.hits++;\n        }\n    }\n    isSunk() {\n        return this.hits === this.length;\n    }\n}\n\nclass gameboard {\n    constructor(size, shipPositions = []) {\n        this.size = size;\n        this.board = Array.from({ length: size }, () => Array(size).fill('.'));\n        this.ships = [];\n        this.missedShots = new Set(); // To keep track of missed shots\n\n        if (shipPositions.length > 0) {\n            this.placeShips(shipPositions);\n        } else {\n            this.randomizeAllShips();\n        }\n    }\n\n    placeShips(shipPositions) {\n        shipPositions.forEach(({ length, orientation, startRow, startCol }) => {\n            const newShip = new ship(length);\n            if (this.canPlaceShip(startRow, startCol, length, orientation)) {\n                this.placeShip(startRow, startCol, length, orientation, newShip);\n                this.ships.push(newShip);\n            } else {\n                throw new Error('Invalid ship placement');\n            }\n        });\n    }\n\n    canPlaceShip(row, col, length, orientation) {\n        const adjacentOffsets = [\n            [-1, -1], [-1, 0], [-1, 1], // above\n            [0, -1],         [0, 1],    // sides\n            [1, -1], [1, 0], [1, 1]     // below\n        ];\n    \n        for (let i = 0; i < length; i++) {\n            let currentRow = row;\n            let currentCol = col;\n            \n            if (orientation === 'H') {\n                currentCol = col + i;\n                if (currentCol >= this.size || this.board[currentRow][currentCol] !== '.') return false;\n            } else {\n                currentRow = row + i;\n                if (currentRow >= this.size || this.board[currentRow][currentCol] !== '.') return false;\n            }\n    \n            // Check surrounding cells\n            for (let [offsetRow, offsetCol] of adjacentOffsets) {\n                const adjacentRow = currentRow + offsetRow;\n                const adjacentCol = currentCol + offsetCol;\n                if (adjacentRow >= 0 && adjacentRow < this.size && adjacentCol >= 0 && adjacentCol < this.size) {\n                    if (this.board[adjacentRow][adjacentCol] !== '.') return false;\n                }\n            }\n        }\n        return true;\n    }\n\n    placeShip(row, col, length, orientation, newShip) {\n        for (let i = 0; i < length; i++) {\n            if (orientation === 'H') {\n                this.board[row][col + i] = newShip;\n            } else {\n                this.board[row + i][col] = newShip;\n            }\n        }\n    }\n\n    randomizeAllShips() {\n        const shipConfigs = [\n            { length: 1, count: 4 },\n            { length: 2, count: 3 },\n            { length: 3, count: 2 },\n            { length: 4, count: 1 }\n        ];\n\n        shipConfigs.forEach(({ length, count }) => {\n            for (let i = 0; i < count; i++) {\n                let placed = false;\n                while (!placed) {\n                    placed = this.randomizeShip(length);\n                }\n            }\n        });\n    }\n\n    randomizeShip(length) {\n        const orientation = Math.random() > 0.5 ? 'H' : 'V';\n        const row = Math.floor(Math.random() * this.size);\n        const col = Math.floor(Math.random() * this.size);\n\n        if (this.canPlaceShip(row, col, length, orientation)) {\n            const newShip = new ship(length);\n            this.placeShip(row, col, length, orientation, newShip);\n            this.ships.push(newShip);\n            return true;\n        }\n        return false;\n    }\n\n\n    receiveAttack(row, col) {\n        const cell = this.board[row][col];\n    \n        if (cell === '.') { // Empty cell, missed shot\n            this.missedShots.add(`${row},${col}`);\n            this.board[row][col] = 'M'; // Mark the missed shot on the board\n            return false; // Missed\n        } else if (cell === 'M' || (cell instanceof ship && cell.hits > 0)) { \n            return false; // Already attacked or already hit part of a ship\n        } else if (cell instanceof ship) { // Unattacked part of a ship\n            cell.hit();\n            this.board[row][col] = 'H'; // Mark the hit on the board (you can customize this as needed)\n            return true; // Hit\n        }\n    \n        return false; // Fallback case, should not normally be reached\n    }\n\n    allShipsSunk() {\n        return this.ships.every(ship => ship.isSunk());\n    }\n}\n\n \n\nfunction updateGridWithShips(board, gridClass) {\n    // Ensure that the gridClass corresponds to the player grid only\n    if (gridClass === 'player-grid') {\n        board.board.forEach((row, rowIndex) => {\n            row.forEach((cell, colIndex) => {\n                if (cell !== '.') {\n                    const cellId = `${gridClass}-cell-${rowIndex * board.size + colIndex}`;\n                    const cellElement = document.getElementById(cellId);\n                    if (cellElement) {\n                        cellElement.classList.add('ship-cell'); // Apply the CSS class for highlighting\n                    }\n                }\n            });\n        });\n    }\n}\nfunction checkShipPlacements(gridClass) {\n    const cells = document.querySelectorAll(`.${gridClass} .grid-cell`);\n    const shipCells = Array.from(cells).filter(cell => cell.classList.contains('ship-cell'));\n    return shipCells.length > 0;\n}\n\n//# sourceURL=webpack://webpack-template/./src/ships.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createGrid: () => (/* binding */ createGrid)\n/* harmony export */ });\n\nfunction createGrid(gridClass, onCellClick) {\n    const grid = document.querySelector(`.${gridClass}`);\n    for (let i = 0; i < 100; i++) {\n        const cell = document.createElement('div');\n        cell.classList.add('grid-cell');\n        cell.id = `${gridClass}-cell-${i}`;\n        cell.addEventListener('click', () => onCellClick(i));\n        grid.appendChild(cell);\n    }\n}\n\n//# sourceURL=webpack://webpack-template/./src/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;