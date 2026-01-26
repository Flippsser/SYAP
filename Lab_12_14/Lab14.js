class Sudoku {
    constructor() {
        this.size = 9;
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    reset() {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    canPlace(row, col, num) {
        if (this.grid[row].includes(num)) return false;
        
        for (let r = 0; r < 9; r++) {
            if (this.grid[r][col] === num) return false;
        }
        
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                if (this.grid[r][c] === num) return false;
            }
        }
        return true;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    solve() {
        const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] === 0) {
                    for (let num of numbers) {
                        if (this.canPlace(row, col, num)) {
                            this.grid[row][col] = num;
                            if (this.solve()) return true;
                            this.grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    generate() {
        this.reset();
        this.solve();
        return this.grid;
    }

    generateGame(emptyCells = 40) {
        this.generate();
        
        const solution = this.grid.map(row => [...row]);
        
        let removed = 0;
        while (removed < emptyCells) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            
            if (this.grid[row][col] !== 0) {
                const backup = this.grid[row][col];
                this.grid[row][col] = 0;
                
                if (this.countFilledCells() >= 17) {
                    removed++;
                } else {
                    this.grid[row][col] = backup;
                    return this.grid;
                }
            }
        }
        return this.grid;
    }

    countFilledCells() {
        let count = 0;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] !== 0) count++;
            }
        }
        return count;
    }

    validate() {
        const errors = { rows: new Set(), cols: new Set(), boxes: new Set() };

        for (let row = 0; row < 9; row++) {
            const seen = new Set();
            for (let col = 0; col < 9; col++) {
                const num = this.grid[row][col];
                if (num !== 0 && seen.has(num)) {
                    errors.rows.add(row);
                    break;
                }
                seen.add(num);
            }
        }

        for (let col = 0; col < 9; col++) {
            const seen = new Set();
            for (let row = 0; row < 9; row++) {
                const num = this.grid[row][col];
                if (num !== 0 && seen.has(num)) {
                    errors.cols.add(col);
                    break;
                }
                seen.add(num);
            }
        }

        for (let box = 0; box < 9; box++) {
            const seen = new Set();
            const startRow = Math.floor(box / 3) * 3;
            const startCol = (box % 3) * 3;
            
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    const num = this.grid[startRow + r][startCol + c];
                    if (num !== 0 && seen.has(num)) {
                        errors.boxes.add(box);
                        break;
                    }
                    seen.add(num);
                }
            }
        }

        return errors;
    }

    isComplete() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] == 0) return false;
            }
        }
        return true;
    }

    setValue(row, col, value) {
        if (row >= 0 && row < 9 && col >= 0 && col < 9 && value >= 0 && value <= 9) {
            this.grid[row][col] = value;
            return true;
        }
        return false;
    }

    getValue(row, col) {
        return this.grid[row][col];
    }
}

class SudokuGame {
    constructor() {
        this.sudoku = new Sudoku();
        this.boardElement = document.getElementById('board');
        this.messageElement = document.getElementById('message');
        this.initialBoard = null;
        this.init();
    }

    init() {
        this.createBoard();
        this.setupEvents();
        this.newGame();
    }

    createBoard() {
        this.boardElement.innerHTML = '';
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.addEventListener('input', (e) => this.onInput(e, i));
            
            cell.appendChild(input);
            this.boardElement.appendChild(cell);
        }
    }

    setupEvents() {
        document.getElementById('generateBtn').onclick = () => this.newGame();
        document.getElementById('checkBtn').onclick = () => this.check();
        document.getElementById('solveBtn').onclick = () => this.solve();
    }

    newGame() {
        this.clearMessage();
        this.clearHighlights();
        this.sudoku.generateGame(40);
        this.initialBoard = this.sudoku.grid.map(row => [...row]);
        this.updateBoard();
        this.lockInitial();
    }

    solve() {
        this.clearMessage();
        this.clearHighlights();
        const errors = this.sudoku.validate();
        
        let hasErrors = errors.rows.size > 0 || errors.cols.size > 0 || errors.boxes.size > 0;
        
        const current = this.sudoku.grid.map(row => [...row]);
        if (!hasErrors) {
            this.sudoku.solve()
            this.updateBoard();
            this.showMessage('Поле решено!', 'success');
        } else {
            this.sudoku.grid = current;
            this.showMessage('Не удалось решить', 'error');
        }
    }

    check() {
        this.clearHighlights();
        const errors = this.sudoku.validate();
        
        let hasErrors = errors.rows.size > 0 || errors.cols.size > 0 || errors.boxes.size > 0;
        
        this.highlightErrors(errors);
        
        if (hasErrors) {
            if(Math.random() > 0.1)
                this.showMessage('Найдены ошибочки!', 'error');
            else
                this.showMessage('Печально', 'error');
        } else if (this.sudoku.isComplete()) {
            this.highlightCorrect();
            this.showMessage('Поздравляем! Решено правильно!', 'success');
        } else {
            this.showMessage('Ошибок нет, продолжайте', 'success');
        }
    }

    lockInitial() {
        for (let i = 0; i < 81; i++) {
            const row = Math.floor(i / 9);
            const col = i % 9;
            const input = this.boardElement.children[i].querySelector('input');
            
            if (this.initialBoard[row][col] !== 0) {
                input.readOnly = true;
                input.style.fontWeight = 'bold';
            } else {
                input.readOnly = false;
                input.style.fontWeight = 'normal';
            }
        }
    }

    highlightErrors(errors) {
        errors.rows.forEach(row => {
            for (let col = 0; col < 9; col++) {
                const index = row * 9 + col;
                const cell = this.boardElement.children[index];
                cell.style.backgroundColor = '#ffebee';
                cell.classList.add('row-error');
            }
        });

        errors.cols.forEach(col => {
            for (let row = 0; row < 9; row++) {
                const index = row * 9 + col;
                const cell = this.boardElement.children[index];
                cell.style.backgroundColor = '#ffebee';
                cell.classList.add('col-error');
            }
        });

        errors.boxes.forEach(box => {
            const startRow = Math.floor(box / 3) * 3;
            const startCol = (box % 3) * 3;
            
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    const index = (startRow + r) * 9 + (startCol + c);
                    const cell = this.boardElement.children[index];
                    cell.style.backgroundColor = '#ffebee';
                    cell.classList.add('box-error');
                }
            }
        });
    }

    highlightCorrect() {
        for (let i = 0; i < 81; i++) {
            const cell = this.boardElement.children[i];
            cell.style.backgroundColor = 'rgb(85, 251, 73)';
            cell.classList.add('correct');
        }
    }

    clearHighlights() {
        for (let i = 0; i < 81; i++) {
            const cell = this.boardElement.children[i];
            cell.style.backgroundColor = '';
            cell.classList.remove('row-error', 'col-error', 'box-error', 'correct');
        }
    }

    onInput(event, index) {
        const value = event.target.value;
        const row = Math.floor(index / 9);
        const col = index % 9;
        
        if (value && !/^[1-9]$/.test(value)) {
            event.target.value = '';
            this.sudoku.setValue(row, col, 0);
        } else {
            this.sudoku.setValue(row, col, value ? parseInt(value) : 0);
        }
        
        this.clearMessage();
        this.clearHighlights();
    }

    updateBoard() {
        for (let i = 0; i < 81; i++) {
            const row = Math.floor(i / 9);
            const col = i % 9;
            const value = this.sudoku.getValue(row, col);
            const input = this.boardElement.children[i].querySelector('input');
            input.value = value === 0 ? '' : value;
        }
    }

    showMessage(text, type) {
        this.messageElement.textContent = text;
        this.messageElement.className = `message ${type}`;
    }

    clearMessage() {
        this.messageElement.textContent = '';
        this.messageElement.className = 'message';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});