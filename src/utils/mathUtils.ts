
function generateRandomInteger(max: number): number {
    return Math.floor(Math.random() * max);
}

function generateRandomIntegerBetween(min: number, max: number): number {
    let difference = max - min;
    return Math.floor((Math.random() * difference) + min);
}

function generateRandomCode(length: number): string {
    let code = ''
    for (let i = 0; i < length; i++) {
        code += String.fromCharCode(generateRandomIntegerBetween(65, 91));
    }
    return code
}

export { generateRandomInteger, generateRandomCode };