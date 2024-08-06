import { gameboard, ship } from "./ships";
 
class Player {
    constructor(size, shipPositions) {
        this.gameboard = new gameboard(size, shipPositions);
    }

    receiveAttack(row, col) {
        return this.gameboard.receiveAttack(row, col);
    }

    allShipsSunk() {
        return this.gameboard.allShipsSunk();
    }
}