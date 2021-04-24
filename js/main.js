// DOM elements
const resultElement = document.getElementById('result');
let lengthElement = document.getElementById('length');
const upperElement = document.getElementById('uppercase');
const lowerElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols
};

// Add event listeners - generate
generateElement.addEventListener('click', () => {
    let length = +lengthElement.value;
    const hasLower = lowerElement.checked;
    const hasUpper = upperElement.checked;
    const hasNumbers = numbersElement.checked;
    const hasSymbols = symbolsElement.checked;

    if(length > 20){
        length = 20;
        lengthElement.value = length;
        alert("Length can't be higher than 20!!!");
        return '';
    }

    resultElement.innerText = generatePassword(length, hasLower, hasUpper, hasNumbers, hasSymbols);
});

// Copy password to clipboard
clipboardElement.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultElement.innerText;

    if(!password){
        return '';
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password is copied to the clipboard');
});

// Genetare password function
function generatePassword(length, lower, upper, number, symbol){
    // 1. init 

    // 2. Filter out unchecked types

    // 3. Loop over length call generator function for each type

    // 4. add final password to the variable and return

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    //console.log('types count: ' + typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    //console.log('typesArr: ' + typesArr);

    if(typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i+=typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}


// Generator functions - http://www.net-comber.com/charset.html

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbols(){
    const symbols = '\|€÷×¤ßŁł][@{}§<>_-:;,.+?*=)(/&%$#"!~ˇ^˘°˛˙˝';
    return symbols[(Math.floor(Math.random() * symbols.length))];
}