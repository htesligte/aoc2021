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

    const uniqDots = [];
    for (const dot of dots) {
        if (!uniqDots.includes(`${dot.x},${dot.y}`)) {
            uniqDots.push(`${dot.x},${dot.y}`);
        }
    }

    console.log(uniqDots.length);
}
main();
