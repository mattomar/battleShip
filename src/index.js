import { Player,Computer } from "./plaeyrs.js";
import { ship } from "./ships.js";
const checkAllShipsSunk = (gameboard) => {
    return gameboard.board.every(row => 
        row.every(cell => 
            cell === '.' || cell === 'H' || cell === 'M'
        )
    );
};
document.addEventListener('DOMContentLoaded', () => {
    const player = new Player(10); // 10x10 grid
    const computer = new Computer(10);
    const messageCard = document.getElementById('message-card');
 
    let lastClickTime = 0; // Timestamp of the last click

    // Function to handle the player's turn
    const handlePlayerTurn = () => {
        const gridClass = 'computer-grid';

        computer.gameboard.board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellId = `${gridClass}-cell-${rowIndex * computer.gameboard.size + colIndex}`;
                const cellElement = document.getElementById(cellId);

                if (cellElement) {
                    cellElement.addEventListener('click', () => {
                        const currentTime = Date.now();
                        const timeSinceLastClick = currentTime - lastClickTime;

                        // Check if 2 seconds have passed since the last click
                        if (timeSinceLastClick < 2000) {
                            console.log("Please wait before clicking again.");
                            return; // Prevent click if less than 2 seconds have passed
                        }

                        lastClickTime = currentTime; // Update last click time

                        const cellContent = computer.gameboard.board[rowIndex][colIndex];

                        if (cellContent === 'H' || cellContent === 'M') {
                            console.log("This cell has already been attacked!");
                            return; // Prevent re-attacking the same cell
                        }

                        if (cellContent instanceof ship) {
                            const attackedShip = cellContent;
                            attackedShip.hit();

                            cellElement.classList.add('hit-cell');
                            computer.gameboard.board[rowIndex][colIndex] = 'H'; // Update board to mark hit
                            console.log("Hit detected!");

                            if (attackedShip.isSunk()) {
                                messageCard.textContent = "Ship Destroyed!";
                                messageCard.classList.add('show');
                                setTimeout(() => {
                                    messageCard.classList.remove('show');
                                }, 3000); // Hide the card after 3 seconds
                            }
                        } else {
                            cellElement.classList.add('missed-cell');
                            computer.gameboard.board[rowIndex][colIndex] = 'M'; // Update board to mark miss
                            console.log("Miss detected!");
                        }

                        // Check if all computer ships are sunk
                        if (checkAllShipsSunk(computer.gameboard)) {
                            messageCard.textContent = "You won!";
                            messageCard.classList.add('show');
                            return; // Stop the game if the player wins
                        }

                        // Wait 2 seconds before the computer's turn
                        setTimeout(handleComputerTurn, 2000);
                    });
                } else {
                    console.log(`Cell with ID ${cellId} not found.`);
                }
            });
        });
    };

    // Function to handle the computer's turn
    const handleComputerTurn = () => {
        let rowIndex, colIndex;
        do {
            rowIndex = Math.floor(Math.random() * player.gameboard.size);
            colIndex = Math.floor(Math.random() * player.gameboard.size);
        } while (player.gameboard.board[rowIndex][colIndex] === 'H' || player.gameboard.board[rowIndex][colIndex] === 'M');

        const cellContent = player.gameboard.board[rowIndex][colIndex];
        const cellId = `player-grid-cell-${rowIndex * player.gameboard.size + colIndex}`;
        const cellElement = document.getElementById(cellId);

        if (cellContent instanceof ship) {
            const attackedShip = cellContent;
            attackedShip.hit();

            cellElement.classList.add('hit-cell');
            player.gameboard.board[rowIndex][colIndex] = 'H'; // Update board to mark hit
            console.log("Computer hit detected!");

            if (attackedShip.isSunk()) {
                messageCard.textContent = "Your ship has been destroyed!";
                messageCard.classList.add('show');
                setTimeout(() => {
                    messageCard.classList.remove('show');
                }, 3000); // Hide the card after 3 seconds
            }
        } else {
            cellElement.classList.add('missed-cell');
            player.gameboard.board[rowIndex][colIndex] = 'M'; // Update board to mark miss
            console.log("Computer miss detected!");
        }

        // Check if all player ships are sunk
        if (checkAllShipsSunk(player.gameboard)) {
            messageCard.textContent = "Computer won!";
            messageCard.classList.add('show');
            return; // Stop the game if the computer wins
        }
    };

    const startButton = document.querySelector('.button button');

    startButton.addEventListener('click', () => {
        startButton.textContent = 'Restart Game'; // Change button text to 'Restart Game'
        handlePlayerTurn(); // Call the function to handle the player's turn

        // Add event listener for restarting the game
        startButton.addEventListener('click', () => {
            location.reload(); // Reload the page to restart the game
        });
    });
 

});


 
