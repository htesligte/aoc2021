const fs = require('fs/promises');
const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n');
    const instructions = lines.map(line => line.split(' '));
    const pos = {depth: 0, forward: 0};
    for (const instruction of instructions) {
        switch(instruction[0]) {
            case 'forward': 
                pos.forward += parseInt(instruction[1]);
                break;
            
            case 'down': 
                pos.depth += parseInt(instruction[1]);
                break;
            
            case 'up':
                pos.depth -= parseInt(instruction[1]);
                break;
        }
    }
    console.log(pos.depth * pos.forward);
}
main();
