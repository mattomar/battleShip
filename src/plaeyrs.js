import { gameboard, updateGridWithShips, ship } from "./ships";
import { createGrid } from "./ui";





export class Player {
    constructor(size) {
        this.gameboard = new gameboard(size);
        this.size = size;
        this.initializeGrid(); // Initialize grid for player if needed
        this.updateGrid();
    }

    initializeGrid() {
        // This may be redundant if the grid is already initialized elsewhere
        createGrid('player-grid', () => {}); // Empty function as we handle clicks in the game logic
    }

    updateGrid() {
        updateGridWithShips(this.gameboard, 'player-grid');
    }

    receiveAttack(row, col) {
        return this.gameboard.receiveAttack(row, col);
    }

    allShipsSunk() {
        return this.gameboard.allShipsSunk();
    }
}

export class Computer {
    constructor(size) {
        this.gameboard = new gameboard(size);
        this.size = size;
        this.initializeGrid(); // Initialize grid for computer if needed
        this.updateGrid();
    }

    initializeGrid() {
        // This may be redundant if the grid is already initialized elsewhere
        createGrid('computer-grid', () => {}); // Empty function as we handle clicks in the game logic
    }

    updateGrid() {
        updateGridWithShips(this.gameboard, 'computer-grid');
    }

    receiveAttack(row, col) {
        return this.gameboard.receiveAttack(row, col);
    }

    allShipsSunk() {
        return this.gameboard.allShipsSunk();
    }
}