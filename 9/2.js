const fs = require('fs/promises');
const readline = require('readline');
const chart = [];
const inputReader = require('wait-console-input')
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

let processed = [];

isProcessed = (p) => {
    let isProcessedv = processed.filter(p1 => p1.x === p.x && p1.y === p.y).length > 0;
    return isProcessedv;
}

const getWallSize = (x, y) => {
    const positions = [
     //{x: x-1, y: y-1, v: getPos(y-1, x-1)},
    {x: x, y: y-1, v: getPos(y-1, x)},
     //{x: x+1, y: y-1, v: getPos(y-1, x+1)},
    {x: x-1, y: y, v: getPos(y, x-1)},
    {x: x+1, y: y, v: getPos(y, x+1)},
    //{x: x-1, y: y+1, v: getPos(y+1, x-1)},
    {x: x, y: y+1, v: getPos(y+1, x)},
    //{x: x+1, y: y+1, v: getPos(y+1, x+1)},
    ]
    const curVal = getPos(y, x);
    let wallSize = 1;
    const wallPositions = positions.filter(p => !isProcessed(p) && p.v < 9 && p.v > curVal);
    for (const wallPosition of wallPositions) {
        processed.push(wallPosition);
        wallSize += getWallSize(wallPosition.x, wallPosition.y);
    }
    return wallSize;
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

debugfn = (item) => {
    let wSize =0;
    for (let y = 0; y < chart.length; y++) {

        process.stdout.write("\n");
        for (let x = 0; x < chart[y].length; x++) {
            if (isProcessed({x: x, y: y})) {
                wSize++;
                const coloredVal = "\x1b[100m" + getPos(y, x) +  "\x1b[49m";
                process.stdout.write(coloredVal);
            } else {
                process.stdout.write(""+getPos(y, x));
            }

            
        }
    }
    console.log(wSize);
}


const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    for (const line of lines) {
        const values = line.split("").map(v => parseInt(v));
        chart.push(values);
    }
   
    const totalSizes =[];

    for (let y = 0; y < chart.length; y++) {
        for (let x = 0; x < chart[y].length; x++) {
            
            if (isLowPoint(x, y)) {
                processed = [];
                const wallSize =getWallSize(x, y);

                if (wallSize > 116) {
                    console.log("WallSize: ", wallSize);
                    debugfn();
                    inputReader.readLine('Press Enter to continue');
                }
                totalSizes.push(getWallSize(x, y));
                
                
            }
        }
    }
    //debugfn();
    console.log("");
    totalSizes.sort(function(a, b) {
        return b - a;
      });
      console.log(totalSizes);
    console.log(totalSizes[0] * totalSizes[1] * totalSizes[2]);
}
main();
