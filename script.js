const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const backspaceButton = document.querySelector("#backspace");
const allClearButton = document.querySelector("#allClear");
const equalButton = document.querySelector("#execute");
const inputDisplay = document.querySelector("#inputDisplay");
const resultDisplay = document.querySelector("#resultDisplay");

//The reason inputs are stored like this is to have an easier backspace function.
let inputArray = ["", "", ""];
const INPUT_INDEX_FIRST_NUMBER = 0;
const INPUT_INDEX_OPERATOR = 1;
const INPUT_INDEX_SECOND_NUMBER = 2;
let currentInputIndex = INPUT_INDEX_FIRST_NUMBER;
let result = 0;

for(const button of numberButtons){
    button.addEventListener("click", e => insertNumber(e.target.textContent));
}
for(const button of operatorButtons){
    button.addEventListener("click", e => insertOperator(e.target.textContent));
}
backspaceButton.addEventListener("click", clearLast);
allClearButton.addEventListener("click", clearAll);
equalButton.addEventListener("click", ()=> calculateResult());



function insertNumber(number){
    if(checkAfterCalculation()) inputArray = ["", "", ""];
    if(inputArray[currentInputIndex].includes(".") && number === ".") return;

    inputArray[currentInputIndex] = inputArray[currentInputIndex].concat(number);
    updateDisplay();
}

function insertOperator(operator){
    if(!inputArray[currentInputIndex] && operator === "-") insertNumber("-");
    if(checkIllegalNumber()) return;
    if(currentInputIndex === INPUT_INDEX_SECOND_NUMBER){
        calculateResult(operator);
        return;
    }
    if(checkAfterCalculation()) inputArray = [result.toString(), "", ""];

    inputArray[INPUT_INDEX_OPERATOR] = operator;
    currentInputIndex = INPUT_INDEX_SECOND_NUMBER;
    updateDisplay();
}

function calculateResult(nextOperator = false){
    if(checkIllegalNumber()) return;
    const numberA = Number(inputArray[INPUT_INDEX_FIRST_NUMBER]);
    const numberB = Number(inputArray[INPUT_INDEX_SECOND_NUMBER]);
    switch(inputArray[INPUT_INDEX_OPERATOR]){
        case "+":
            result = numberA + numberB;
            break;
        case "-":
            result = numberA - numberB;
            break;
        case "x":
            result = numberA * numberB;
            break;
        case "/":
            if(numberB === 0) return;
            result = numberA / numberB;
            break;
        case "":
            result = numberA;
            break;
        default:
            console.log(`Error on calculateResult: unrecognized operator "${inputArray[INPUT_INDEX_OPERATOR]}".`);
    }

    if(nextOperator) inputArray = [result.toString(), nextOperator, ""];
    currentInputIndex = nextOperator? INPUT_INDEX_SECOND_NUMBER : INPUT_INDEX_FIRST_NUMBER;
    updateDisplay();
}

function clearLast(){
    if(!inputArray[INPUT_INDEX_FIRST_NUMBER]) return;
    if(checkAfterCalculation()) currentInputIndex = INPUT_INDEX_SECOND_NUMBER;
    if(!inputArray[currentInputIndex]) currentInputIndex--;

    inputArray[currentInputIndex] = inputArray[currentInputIndex].slice(0, inputArray[currentInputIndex].length - 1);
    if(currentInputIndex === INPUT_INDEX_OPERATOR) currentInputIndex--;
    updateDisplay();
}

function clearAll(){
    inputArray = ["", "", ""];
    result = 0;
    currentInputIndex = INPUT_INDEX_FIRST_NUMBER;
    updateDisplay();
}

function updateDisplay(){
    inputDisplay.textContent = inputArray.join("");
    resultDisplay.textContent = result;
}

function checkAfterCalculation(){
    return currentInputIndex === INPUT_INDEX_FIRST_NUMBER && inputArray[INPUT_INDEX_SECOND_NUMBER];
}

function checkIllegalNumber(){
    return !inputArray[currentInputIndex] || inputArray[currentInputIndex] === "-" || inputArray[currentInputIndex] === ".";
}