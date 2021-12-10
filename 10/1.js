const fs = require('fs/promises');




const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    const state = [];
    const opposite = {
        "[": "]",
        "{": "}",
        "(": ")",
        "<": ">"
    };
    const openItems = ['[', '{', '(', '<'];
    const score = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    };
    let currentScore =0;
    for (const line of lines) {
        for (const char of line.split("")) {
            const currentState = state[state.length-1];
            if (openItems.includes(char)) {
                state.push(char);
            } else {
                if (opposite[currentState] === char) {
                    state.pop();
                } else {
                    currentScore += score[char];
                    //console.log(`Expected ${opposite[currentState]} but found ${char}`);
                    break;
                }
            }
        }
    }
    console.log(currentScore);
}
main();
