import { ship,gameboard } from "./ships";


describe('ship class', () => {
    test('hit method increments hits', () => {
        const testShip = new ship(3);
        testShip.hit();
        expect(testShip.hits).toBe(1);
    });

    test('hit method does not exceed length', () => {
        const testShip = new ship(2);
        testShip.hit();
        testShip.hit();
        testShip.hit();
        expect(testShip.hits).toBe(2);
    });

    test('isSunk method returns true if hits equal length', () => {
        const testShip = new ship(2);
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    });

    test('isSunk method returns false if hits do not equal length', () => {
        const testShip = new ship(3);
        testShip.hit();
        expect(testShip.isSunk()).toBe(false);
    });
});

 
    test('receiveAttack method records missed shots correctly', () => {
        const positions = [
            { length: 3, orientation: 'H', startRow: 0, startCol: 0 },
        ];
        const board = new gameboard(5, positions);
        const result = board.receiveAttack(1, 1);
        expect(result).toBe(false);
        expect(board.missedShots.has('1,1')).toBe(true);
        expect(board.board[1][1]).toBe('M');
    });

    test('receiveAttack method records hits correctly', () => {
        const positions = [
            { length: 3, orientation: 'H', startRow: 0, startCol: 0 },
        ];
        const board = new gameboard(5, positions);
        const result = board.receiveAttack(0, 0);
        expect(result).toBe(true);
        expect(board.board[0][0]).toBe('H');
        expect(board.ships[0].hits).toBe(1);
    });

    test('receiveAttack method does not re-hit already hit spots', () => {
        const positions = [
            { length: 3, orientation: 'H', startRow: 0, startCol: 0 },
        ];
        const board = new gameboard(5, positions);
        board.receiveAttack(0, 0);
        const result = board.receiveAttack(0, 0);
        expect(result).toBe(false);
        expect(board.ships[0].hits).toBe(1);
    });

    test('allShipsSunk method returns true when all ships are sunk', () => {
        const positions = [
            { length: 1, orientation: 'H', startRow: 0, startCol: 0 },
            { length: 1, orientation: 'H', startRow: 1, startCol: 0 },
        ];
        const board = new gameboard(5, positions);
        board.receiveAttack(0, 0);
        board.receiveAttack(1, 0);
        expect(board.allShipsSunk()).toBe(true);
    });

    test('allShipsSunk method returns false when not all ships are sunk', () => {
        const positions = [
            { length: 1, orientation: 'H', startRow: 0, startCol: 0 },
            { length: 1, orientation: 'H', startRow: 1, startCol: 0 },
        ];
        const board = new gameboard(5, positions);
        board.receiveAttack(0, 0);
        expect(board.allShipsSunk()).toBe(false);
    });
 