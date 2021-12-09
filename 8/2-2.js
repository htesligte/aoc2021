const fs = require('fs/promises');
/*
 aaaa 
b    c
b    c
 dddd 
e    f
e    f
 gggg 
*/

const compareArr = (arr1, arr2) => {
    if (arr1.length != arr2.length) {
        return false;
    }
    for (const v of arr1) {
        if (!arr2.includes(v)) {
            return false;
        }
    }
    return true;
}

const array_in_array = (arr1, arr2) => {
    for (const v of arr1) {
        if (!arr2.includes(v)) {
            return false;
        }
    }
    return true;
}


const isTwo = (str, bd)  => {
    return !array_in_array(bd, str);
}

const isThree = (str, cf) => {
    return array_in_array(cf, str);
}

const isZero = (str, cf, bd) => {
    return array_in_array(cf, str) && !array_in_array(bd, str);
}

const isSix = (str, cf) => {
    return !array_in_array(cf, str);
}

const main = async () => {
    const contents = await fs.readFile('input.txt');
    const lines = contents.toString().split('\n').filter((line) => line.length > 0);

    let totalValue =0;

    for (const line of lines) {
        // find cf and bd
        const [pattern, output] = line.split('|');
        const allParts = pattern.trim().split(' ').concat(output.trim().split(' '));


        const cf = allParts.filter(signal => signal.length === 2)[0].split('');
        const bd = allParts.filter(signal => signal.length === 4)[0].split('').filter(v => !cf.includes(v));
        
        let numbers = [];

        for (const signal of output.trim().split(' ')) {
            let signalValue = -1;
            switch (signal.length) {
                case 2: 
                    signalValue = 1;
                    break;                
                case 3: 
                    signalValue = 7;
                    break;
                
                case 4: 
                    signalValue = 4;
                    break;
                case 5: 
                    if (isThree(signal.split(""), cf)) {
                        signalValue = 3;
                    } else {
                        if (isTwo(signal.split(""), bd)) {
                            signalValue = 2;
                        } else {
                            signalValue = 5;
                        }
                    }
                    break;
                case 6: 
                    if (isZero(signal.split(""), cf, bd)) {
                        signalValue = 0;
                    } else {
                        if (isSix(signal.split(""), cf)) {
                            signalValue = 6;
                        } else {
                            signalValue = 9;
                        }
                    }
                    break;
                case 7:
                    signalValue = 8;
                    break;

                default:
                    throw new Error("Invalid value " + signal);

            }
            numbers.push(signalValue);
        }
        
        totalValue += parseInt(numbers.join(""));
    }
    console.log(totalValue);

}
main();
