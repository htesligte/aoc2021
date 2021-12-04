const fs = require('fs/promises');

const processed = [];

isBoardComplete = (board) => {
    // check rows
    for (const row of board.rows) {
        let c = 0;
        do {
            c++;
            if (c > row.length) {
                return true;
            }
        } while(processed.includes(row[c-1]));
    }

    // check columns
    for (let c = 0; c < board.rows[0].length; c++) {
        let found = false;
        for (const row of board.rows) {
            if (!processed.includes(row[c])) {
                found = false;
                break ;
            }
            found = true;
        }
        if (found) {
            return true;
        }
    }
   return false;
}

const findUnmarkedNumbers = (board) => {
    const unmarkedNumbers = [];
    for (const row of board.rows) {
        for (const cell of row) {
            if (!processed.includes(cell)) {
                unmarkedNumbers.push(cell);
            }
        }
    }
    return unmarkedNumbers;
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n');
    
    const boards = [];

    for (let i = 2; i < lines.length; i+=6) {
        const board = {rows: [], isComplete: false};
        for (let j = 0; j < 5; j++) {
            const cells = (lines[i+j].split(' ')).filter((c) => !!c);
            board.rows.push(cells);
        }
        boards.push(board);
    }

    const items = lines[0].split(',').filter((v) => !!v);
    for (const v of items) {
        processed.push(v);
        for (const board of boards) {
            if (!board.isComplete && isBoardComplete(board)) {
                board.isComplete = true;
                const unmarked = findUnmarkedNumbers(board).map(n => parseInt(n));
                const sum = unmarked.reduce((a, b) => a + b, 0);
                console.log(sum * parseInt(v));
            }
        }
    }
    
}
main();