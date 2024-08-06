import { ship,gameboard } from "./ships";

test('should increase hits when hit() is called', () => {
    const myShip = new ship(3); // Create a ship of length 3
    expect(myShip.hits).toBe(0); // Initial hits should be 0
    myShip.hit();
    expect(myShip.hits).toBe(1); // After one hit, hits should be 1
    myShip.hit();
    expect(myShip.hits).toBe(2); // After another hit, hits should be 2
    myShip.hit();
    expect(myShip.hits).toBe(3); // After hitting maximum times, hits should be 3
    myShip.hit(); // Hitting beyond the length should not increase hits
    expect(myShip.hits).toBe(3);
});

test('should check if the ship is sunk', () => {
    const myShip = new ship(2);
    expect(myShip.isSunk()).toBe(false); // Ship should not be sunk initially
    myShip.hit();
    expect(myShip.isSunk()).toBe(false); // Ship should still not be sunk
    myShip.hit();
    expect(myShip.isSunk()).toBe(true); // Ship should be sunk now
});

 

describe('gameboard', () => {
    let board;

    beforeEach(() => {
        const size = 10;
        const shipPositions = [
            { length: 5, orientation: 'H', startRow: 1, startCol: 2 },
            { length: 3, orientation: 'V', startRow: 4, startCol: 5 },
        ];
        board = new gameboard(size, shipPositions);
    });

    test('should mark an attack as a miss', () => {
        const result = board.receiveAttack(0, 0);
        expect(result).toBe(false);
        expect(board.board[0][0]).toBe('M');
    });

    test('should mark an attack as a hit', () => {
        // Assuming that placing ships as per the shipPositions in the beforeEach
        const result = board.receiveAttack(1, 2); // Adjust based on your ship positions
        expect(result).toBe(true);
        expect(board.board[1][2]).toBe('H');
    });

    test('should correctly report when all ships are sunk', () => {
        // Attack all parts of all ships
        const shipPositions = [
            { length: 5, orientation: 'H', startRow: 1, startCol: 2 },
            { length: 3, orientation: 'V', startRow: 4, startCol: 5 },
        ];
        shipPositions.forEach(({ length, orientation, startRow, startCol }) => {
            for (let i = 0; i < length; i++) {
                if (orientation === 'H') {
                    board.receiveAttack(startRow, startCol + i);
                } else {
                    board.receiveAttack(startRow + i, startCol);
                }
            }
        });

        expect(board.allShipsSunk()).toBe(true);
    });

    test('should correctly report when not all ships are sunk', () => {
        // Attack only part of one ship
        board.receiveAttack(1, 2); // Adjust based on your ship positions

        expect(board.allShipsSunk()).toBe(false);
    });
});