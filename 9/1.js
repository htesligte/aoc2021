const fs = require('fs/promises');

const chart = [];

getPos = (y, x) => {
    const b = 12;
    if (y < 0 || y >= chart.length) {
        return 999;
    }
    if (x < 0 || x >= chart[0].length) {
        return 999;
    }
    return chart[y][x];
}

const isLowPoint = (x, y) => {
    //let tl = getPos(y-1, x-1);
    let t = getPos(y-1, x);
    //let tr = getPos(y-1, x+1);
    let l = getPos(y, x-1);
    let v = getPos(y, x);
    let r = getPos(y, x+1);
    //let bl = getPos(y+1, x-1);
    let b = getPos(y+1, x);
    //let br = getPos(y+1, x+1);
    const lowPoint = v < t && v < l && v < r && v < b;
    //const lowPoint = v < tl && v < t && v < tr && v < l && v < r && v < bl && v < b && v < br;

    return lowPoint;
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    for (const line of lines) {
        const values = line.split("").map(v => parseInt(v));
        chart.push(values);
    }
   
    let trl = 0;

    const processed = {};

    for (let y = 0; y < chart.length; y++) {
        for (let x = 0; x < chart[y].length; x++) {
            
            if (isLowPoint(x, y)) {
                console.log(x, y, getPos(y, x));
                trl += 1+getPos(y, x);
            }
        }
    }
    console.log(trl);
}
main();
