const { fchownSync } = require('fs');
const fs = require('fs/promises');
const dots = [];

const fold = (x, y) => {
    if (x) {
        for (const dot of dots) {
            if (dot.x > x) {
                dot.x = x - (dot.x - x);
            }
        }
    } else {
        for (const dot of dots) {
            if (dot.y > y) {
                dot.y = y - (dot.y - y);
            }
        }
    }
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    for (const line of lines) {
        const [x, y] = line.split(",");
        dots.push({x, y});
    }

    fold(655, false);
    fold(false, 447);
    fold(327, false);
    fold(false, 223);
    fold(163, false);
    fold(false, 111);
    fold(81, false);
    fold(false, 55);
    fold(40, false);
    fold(false, 27);
    fold(false, 13);
    fold(false, 6);

    const maxY = dots.reduce((p, c) => c.y > p ? c.y : p, 0);
    const maxX = dots.reduce((p, c) => c.x > p ? c.x : p, 0);

    const grid = {};
    for (const dot of dots) {
        if (!grid[dot.y]) {
            grid[dot.y] = {};
        }
        grid[dot.y][dot.x] = "#";
    }

    let csv = "";
    for (let y = 0; y <= maxY; y++) {
        for (let x = 0; x <= maxX; x++) {
            csv += (grid[y][x] ? grid[y][x] : ".") + ","
        }
        csv += "\n";
    }
    await fs.writeFile("output.csv", csv);
}
main();






