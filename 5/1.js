const fs = require('fs/promises');

let board = {};
drawField = (x, y) => {
    if (!board[y]) {
        board[y] = {};
    }
    if (!board[y][x]) {
        board[y][x] = 1;
    } else {
        board[y][x]++;
    }
}

const getRange = (start, end) => {
    const range = [];
    if (start < end) {
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
    } else {
        for (let i = start; i >= end; i--) {
            range.push(i);
        }
    }
    
    return range;
}

const getHorizontalRange = (start, end) => {
    const xRange = getRange(start.x, end.x);
    const positions = [];
    for (let p =0; p < xRange.length; p++) {
        positions.push({x: xRange[p], y: start.y});
    }
    return positions;
}

const getVerticalRange = (start, end) => {
    const yRange = getRange(start.y, end.y);
    const positions = [];
    for (let p =0; p < yRange.length; p++) {
        positions.push({y: yRange[p], x: start.x});
    }
    return positions;
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    let lines = contents.toString().split('\n').map(line => {
        const [start, end] = line.split(' -> ');
        const [startX, startY] = start.split(',');
        const [endX, endY] = end.split(',');
        return {
            start: {
                x: parseInt(startX),
                y: parseInt(startY)
            },
            end: {
                x: parseInt(endX),
                y: parseInt(endY)
            }
        };
    });
    let maxX = 0; maxY = 0;
    lines = lines.map(line => {
        if (line.end.x > maxX) {
            maxX = line.end.x;
        }
        if (line.end.y > maxY) {
            maxY = line.end.y;
        }
        return line;
    });

    for (const line of lines) {
        // horizontal
        let positions = [];
        if (line.start.y === line.end.y) {
            positions = getHorizontalRange(line.start, line.end);
            
        }else if(line.start.x === line.end.x) {        // vertical
            positions = getVerticalRange(line.start, line.end);
        } else { // diagonal
            continue;
        }
        for (const position of positions) {
            drawField(position.x, position.y);
        }
    }
    
    let str = "";
    let dupCounter =0;
    for (let yp = 0; yp <= maxY; yp++) {
        if (!board[yp]) {
            board[yp] = {};
        }
        for (let xp = 0; xp <= maxX; xp++) {
            if (board[yp][xp]) {
                str += board[yp][xp];
                if (board[yp][xp] > 1) {
                    dupCounter++;
                }
            } else {
                str += ".";
            }
        }
        str += "\n";
    }
    //console.log(str);
    console.log(dupCounter);
}
main();