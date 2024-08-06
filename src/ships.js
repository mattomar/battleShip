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
    constructor(size, shipPositions) {
        this.size = size;
        this.board = Array.from({ length: size }, () => Array(size).fill('.'));
        this.ships = [];
        this.missedShots = new Set(); // To keep track of missed shots
        this.placeShips(shipPositions);
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
        for (let i = 0; i < length; i++) {
            if (orientation === 'H') {
                if (col + i >= this.size || this.board[row][col + i] !== '.') return false;
            } else {
                if (row + i >= this.size || this.board[row + i][col] !== '.') return false;
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

    receiveAttack(row, col) {
        if (this.board[row][col] === '.') {
            this.missedShots.add(`${row},${col}`);
            this.board[row][col] = 'M'; // Mark the missed shot on the board
            return false; // Missed
        } else if (this.board[row][col] === 'M' || this.board[row][col] === 'H') {
            return false; // Already attacked
        } else {
            const attackedShip = this.board[row][col];
            attackedShip.hit();
            this.board[row][col] = 'H'; // Mark the hit on the board
            return true; // Hit
        }
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}

export function createGrid(gridClass) {
    const grid = document.querySelector(`.${gridClass}`);
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.id = `${gridClass}-cell-${i}`;
        grid.appendChild(cell);
        console.log('vc')
    }
}