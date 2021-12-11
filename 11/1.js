const fs = require('fs/promises');
let grid = [];
let cycleCount = 0;
flashed = {};
const getNeighbours = (x, y) => {
    const neighbours = [];
    if (x > 0 && y > 0) {
        neighbours.push({x: x-1, y: y-1}); // top-left
    }
    if (y > 0) {
        neighbours.push({x: x, y: y-1}); // top
    }
    if (y > 0 && x < grid[y].length-1) {
        neighbours.push({x: x+1, y: y-1}); // top-right
    }
    if (x > 0) {
        neighbours.push({x: x-1, y: y}); // left
    }
    if (x < grid[y].length-1) {
        neighbours.push({x: x+1, y: y}); // right
    }
    if (y < grid.length-1 && x > 0) {
        neighbours.push({x: x-1, y: y+1}); // bottom-left
    }
    if (y < grid.length-1) {
        neighbours.push({x: x, y: y+1}); // bottom
    }
    if (y < grid.length-1 && x < grid[y].length-1) {
        neighbours.push({x: x+1, y: y+1});
    }
    return neighbours;
}

const flash = (x, y) => {
    if (flashed[cycleCount].includes([x, y].join(""))) {
        return;
    }
    flashed[cycleCount].push([x, y].join(""));
    const neighbours = getNeighbours(x, y);
    for (const neighbour of neighbours) {
        grid[neighbour.y][neighbour.x]++;
        if (grid[neighbour.y][neighbour.x] > 9) {
            flash(neighbour.x, neighbour.y);
        }
    }
}

const runCycle = () => {
    cycleCount++;
    flashed[cycleCount] = [];
    // first everything increases in energy
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x]++;
        }
    }

    // then we find everything that is larger than 9 and it flashes
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] > 9) {
                flash(x, y);
            }
        }
    }

    // and now we set everything that has flashed back to 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] > 9) {
                grid[y][x] = 0;
            }
        }
    }
}

debugFn = () => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 0 || grid[y][x] > 9) {
                const coloredVal = "\x1b[100m" + grid[y][x] +  "\x1b[49m";
                process.stdout.write(coloredVal);
            } else {
                process.stdout.write("" + grid[y][x]);
            }
        }
        process.stdout.write("\n");
    }
    process.stdout.write("\n");
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    for (const line of lines) {
        grid.push(line.split("").map(v => parseInt(v)));
    }
    let flashCount = 0;
    for (let i = 0; i < 100; i++) {
       runCycle();
       flashCount += flashed[i+1].length;
    }
    console.log(flashCount);
}
main();
