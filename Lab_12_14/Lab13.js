class Sudoku {
    constructor() {
        this.size = 9;
        this.boxSize = 3;
        this.reset();
    }

    reset() {
        this.board = Array(this.size).fill().map(() => Array(this.size).fill(0));
    }

    generate() {
        this.reset();
        this.solve();
        return this.board;
    }

    solve() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.board[row][col] === 0) {
                    const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    
                    for (let num of numbers) {
                        if (this.isValidPlacement(row, col, num)) {
                            this.board[row][col] = num;
                            
                            if (this.solve()) {
                                return true;
                            }
                            
                            this.board[row][col] = 0;
                        }
                    }
                    return false;
                }
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

    isValidPlacement(row, col, num) {
        return this.isValidRow(row, num) && 
               this.isValidCol(col, num) && 
               this.isValidBox(row - row % this.boxSize, col - col % this.boxSize, num);
    }

    isValidRow(row, num) {
        for (let col = 0; col < this.size; col++) {
            if (this.board[row][col] === num) {
                return false;
            }
        }
        return true;
    }

    isValidCol(col, num) {
        for (let row = 0; row < this.size; row++) {
            if (this.board[row][col] === num) {
                return false;
            }
        }
        return true;
    }

    isValidBox(startRow, startCol, num) {
        for (let row = 0; row < this.boxSize; row++) {
            for (let col = 0; col < this.boxSize; col++) {
                if (this.board[startRow + row][startCol + col] == num) {
                    return false;
                }
            }
        }
        return true;
    }
 
    validateBoard() {
        const errors = {
            rows: [],
            cols: [],
            boxes: []
        };

        // Проверка строк
        for (let row = 0; row < this.size; row++) {
            const seen = new Set();
            for (let col = 0; col < this.size; col++) {
                const num = this.board[row][col];
                if (num !== 0) {
                    if (seen.has(num)) {
                        errors.rows.push(row + 1);
                        break;
                    }
                    seen.add(num);
                }
            }
        }

        // Проверка столбцов
        for (let col = 0; col < this.size; col++) {
            const seen = new Set();
            for (let row = 0; row < this.size; row++) {
                const num = this.board[row][col];
                if (num !== 0) {
                    if (seen.has(num)) {
                        errors.cols.push(col + 1);
                        break;
                    }
                    seen.add(num);
                }
            }
        }

        // Проверка квадратов 3x3
        for (let boxRow = 0; boxRow < this.boxSize; boxRow++) {
            for (let boxCol = 0; boxCol < this.boxSize; boxCol++) {
                const seen = new Set();
                const startRow = boxRow * this.boxSize;
                const startCol = boxCol * this.boxSize;
                let hasError = false;

                for (let row = 0; row < this.boxSize; row++) {
                    for (let col = 0; col < this.boxSize; col++) {
                        const num = this.board[startRow + row][startCol + col];
                        if (num !== 0) {
                            if (seen.has(num)) {
                                errors.boxes.push(boxRow * this.boxSize + boxCol + 1);
                                hasError = true;
                                break;
                            }
                            seen.add(num);
                        }
                    }
                    if (hasError) break;
                }
            }
        }

        return errors;
    }

    printErrors() {
        const errors = this.validateBoard();
        
        if (errors.rows.length > 0) {
            console.log(`Ошибки в строках: ${errors.rows.join(', ')}`);
        }
        
        if (errors.cols.length > 0) {
            console.log(`Ошибки в столбцах: ${errors.cols.join(', ')}`);
        }
        
        if (errors.boxes.length > 0) {
            console.log(`Ошибки в квадратах: ${errors.boxes.join(', ')}`);
        }

        if (errors.rows.length === 0 && errors.cols.length === 0 && errors.boxes.length === 0) {
            console.log("Ошибок не найдено!");
        }
    }

    printBoard() {
        console.log("\nТекущее игровое поле:");
        console.log("─".repeat(25));
        
        for (let row = 0; row < this.size; row++) {
            let line = "│ ";
            for (let col = 0; col < this.size; col++) {
                const num = this.board[row][col];
                line += (num === 0 ? "." : num) + " ";
                if ((col + 1) % this.boxSize === 0 && col !== this.size - 1) {
                    line += "│ ";
                }
            }
            line += "│";
            console.log(line);
            
            if ((row + 1) % this.boxSize === 0 && row !== this.size - 1) {
                console.log("│" + "───────" + "┼" + "───────" + "┼" + "───────" + "│");
            }
        }
        console.log("─".repeat(25));
    }

    setValue(row, col, value) {
        if (row >= 0 && row < this.size && col >= 0 && col < this.size && 
            value >= 0 && value <= 9) {
            this.board[row][col] = value;
            return true;
        }
        return false;
    }

    getValue(row, col) {
        if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
            return this.board[row][col];
        }
        return null;
    }
}

function demo() {
    console.log("=== ДЕМОНСТРАЦИЯ РАБОТЫ КЛАССА SUDOKU ===\n");
    
    const sudoku = new Sudoku();
    
    console.log("1. Генерация правильно заполненного поля:");
    sudoku.generate();
    sudoku.printBoard();
    sudoku.printErrors();
    
    console.log("\n2. Сброс игрового поля:");
    sudoku.reset();
    sudoku.printBoard();
    
    console.log("\n3. Создание поля с ошибками:");
    
    const testBoard = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0],
        [7, 0, 0, 0, 0, 0, 0, 0, 0],
        [8, 0, 0, 0, 0, 0, 0, 0, 0],
        [9, 0, 0, 0, 0, 0, 0, 0, 9]
    ];
    
    sudoku.board = testBoard;
    sudoku.printBoard();
    sudoku.printErrors();
    
    console.log("\n4. Проверка валидности размещения числа 5 в позиции (0,1):");
    console.log(sudoku.isValidPlacement(0, 1, 5) ? "Размещение валидно" : "Размещение невалидно");
}

demo();