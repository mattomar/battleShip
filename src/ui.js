
export function createGrid(gridClass, onCellClick) {
    const grid = document.querySelector(`.${gridClass}`);
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.id = `${gridClass}-cell-${i}`;
        cell.addEventListener('click', () => onCellClick(i));
        grid.appendChild(cell);
    }
}