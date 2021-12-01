const fs = require('fs/promises');
const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n');
    let prev = 0, inc = 0;
    for (let i = 0; i < lines.length; i++) {
        cur = 0;
        if (i+2 >= lines.length) {
            break;
        }
        let debug = [];
        for (let j = 0; j < 3; j++) {
            cur += parseInt(lines[i+j]);
            debug.push(lines[i+j]);
        }
        if (cur > prev) {
            inc++;
        }
        prev = cur;
    }
    console.log(inc-1);
}
main();
