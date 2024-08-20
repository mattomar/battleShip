   
  export class ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    hit() {
        if (this.hits < this.length) {
            this.hits++;
        }
    }
    isSunk() {
        return this.hits === this.length;
    }
}

export class gameboard {
    constructor(size, shipPositions = []) {
        this.size = size;
        this.board = Array.from({ length: size }, () => Array(size).fill('.'));
        this.ships = [];
        this.missedShots = new Set(); // To keep track of missed shots

        if (shipPositions.length > 0) {
            this.placeShips(shipPositions);
        } else {
            this.randomizeAllShips();
        }
    }

    placeShips(shipPositions) {
        shipPositions.forEach(({ length, orientation, startRow, startCol }) => {
            const newShip = new ship(length);
            if (this.canPlaceShip(startRow, startCol, length, orientation)) {
                this.placeShip(startRow, startCol, length, orientation, newShip);
                this.ships.push(newShip);
            } else {
                throw new Error('Invalid ship placement');
            }
        });
    }

    canPlaceShip(row, col, length, orientation) {
        const adjacentOffsets = [
            [-1, -1], [-1, 0], [-1, 1], // above
            [0, -1],         [0, 1],    // sides
            [1, -1], [1, 0], [1, 1]     // below
        ];
    
        for (let i = 0; i < length; i++) {
            let currentRow = row;
            let currentCol = col;
            
            if (orientation === 'H') {
                currentCol = col + i;
                if (currentCol >= this.size || this.board[currentRow][currentCol] !== '.') return false;
            } else {
                currentRow = row + i;
                if (currentRow >= this.size || this.board[currentRow][currentCol] !== '.') return false;
            }
    
            // Check surrounding cells
            for (let [offsetRow, offsetCol] of adjacentOffsets) {
                const adjacentRow = currentRow + offsetRow;
                const adjacentCol = currentCol + offsetCol;
                if (adjacentRow >= 0 && adjacentRow < this.size && adjacentCol >= 0 && adjacentCol < this.size) {
                    if (this.board[adjacentRow][adjacentCol] !== '.') return false;
                }
            }
        }
        return true;
    }

    placeShip(row, col, length, orientation, newShip) {
        for (let i = 0; i < length; i++) {
            if (orientation === 'H') {
                this.board[row][col + i] = newShip;
            } else {
                this.board[row + i][col] = newShip;
            }
        }
    }

    randomizeAllShips() {
        const shipConfigs = [
            { length: 1, count: 4 },
            { length: 2, count: 3 },
            { length: 3, count: 2 },
            { length: 4, count: 1 }
        ];

        shipConfigs.forEach(({ length, count }) => {
            for (let i = 0; i < count; i++) {
                let placed = false;
                while (!placed) {
                    placed = this.randomizeShip(length);
                }
            }
        });
    }

    randomizeShip(length) {
        const orientation = Math.random() > 0.5 ? 'H' : 'V';
        const row = Math.floor(Math.random() * this.size);
        const col = Math.floor(Math.random() * this.size);

        if (this.canPlaceShip(row, col, length, orientation)) {
            const newShip = new ship(length);
            this.placeShip(row, col, length, orientation, newShip);
            this.ships.push(newShip);
            return true;
        }
        return false;
    }


    receiveAttack(row, col) {
        const cell = this.board[row][col];
    
        if (cell === '.') { // Empty cell, missed shot
            this.missedShots.add(`${row},${col}`);
            this.board[row][col] = 'M'; // Mark the missed shot on the board
            return false; // Missed
        } else if (cell === 'M' || (cell instanceof ship && cell.hits > 0)) { 
            return false; // Already attacked or already hit part of a ship
        } else if (cell instanceof ship) { // Unattacked part of a ship
            cell.hit();
            this.board[row][col] = 'H'; // Mark the hit on the board (you can customize this as needed)
            return true; // Hit
        }
    
        return false; // Fallback case, should not normally be reached
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}

 

export function updateGridWithShips(board, gridClass) {
    // Ensure that the gridClass corresponds to the player grid only
    if (gridClass === 'player-grid') {
        board.board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell !== '.') {
                    const cellId = `${gridClass}-cell-${rowIndex * board.size + colIndex}`;
                    const cellElement = document.getElementById(cellId);
                    if (cellElement) {
                        cellElement.classList.add('ship-cell'); // Apply the CSS class for highlighting
                    }
                }
            });
        });
    }
}
export function checkShipPlacements(gridClass) {
    const cells = document.querySelectorAll(`.${gridClass} .grid-cell`);
    const shipCells = Array.from(cells).filter(cell => cell.classList.contains('ship-cell'));
    return shipCells.length > 0;
}