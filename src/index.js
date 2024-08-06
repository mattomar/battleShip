 function createGrid(gridClass) {
    const grid = document.querySelector(`.${gridClass}`);
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.id = `${gridClass}-cell-${i}`;
        grid.appendChild(cell);
        console.log('vc')
    }
}

createGrid('player-grid');
createGrid('computer-grid');