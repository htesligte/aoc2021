const fs = require('fs/promises');




const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);
    const opposite = {
        "[": "]",
        "{": "}",
        "(": ")",
        "<": ">"
    };
    const openItems = ['[', '{', '(', '<'];
    const score = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    };

    let closingScores = [];
    for (const line of lines) {
        const state = [];
        let brokenLine = false;
        for (const char of line.split("")) {
            const currentState = state[state.length-1];
            if (openItems.includes(char)) {
                state.push(char);
            } else {
                if (opposite[currentState] === char) {
                    state.pop();
                } else {
                    brokenLine = true;
                    break;
                }
            }
        }
        if (!brokenLine) {
            // all other lines are incomplete
            let ls = 0;
            do {
                ls *= 5;
                ls += score[opposite[state.pop()]];
            } while (state.length > 0);
            closingScores.push(ls);
            
        }
        
    }
    closingScores.sort(function(a, b) {
        return a - b;
      });

    console.log(closingScores[Math.floor(closingScores.length/2)]);
}
main();
