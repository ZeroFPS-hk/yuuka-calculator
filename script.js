const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const backspaceButton = document.querySelector("#backspace");
const allClearButton = document.querySelector("#allClear");
const equalButton = document.querySelector("#execute");
const inputDisplay = document.querySelector("#inputDisplay");
const resultDisplay = document.querySelector("#resultDisplay");
const characterImage = document.querySelector("#characterImage");

//The reason inputs are stored like this is to have an easier backspace function.
let inputArray = ["", "", ""];
const INPUT_INDEX_FIRST_NUMBER = 0;
const INPUT_INDEX_OPERATOR = 1;
const INPUT_INDEX_SECOND_NUMBER = 2;
let currentInputIndex = INPUT_INDEX_FIRST_NUMBER;
let result = "0";
let currentCharacter = "yuuka"; //futureproofing in case I want to do something here

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
    if(inputArray[currentInputIndex].includes(".") && number === "."){
        updateCharacter("Error");
        return;
    }

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
    if(checkAfterCalculation()) inputArray = [result, "", ""];

    inputArray[INPUT_INDEX_OPERATOR] = operator;
    currentInputIndex = INPUT_INDEX_SECOND_NUMBER;
    updateDisplay();
}

function calculateResult(nextOperator = false){
    if(checkIllegalNumber()){
        updateCharacter("Error");
        return;
    }
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
            if(numberB === 0){
                console.log("If you can read this, you tried to divide by 0. Big no-no.");
                updateCharacter("Disappointed");
                return;
            }
            result = numberA / numberB;
            break;
        case "":
            result = numberA;
            break;
        default:
            console.log(`Error on calculateResult: unrecognized operator "${inputArray[INPUT_INDEX_OPERATOR]}".`);
    }

    result = result.toString();
    if(nextOperator) inputArray = [result, nextOperator, ""];
    currentInputIndex = nextOperator? INPUT_INDEX_SECOND_NUMBER : INPUT_INDEX_FIRST_NUMBER;
    updateDisplay();
    checkEasterEgg(nextOperator);
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
    updateImage("Default");
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

function updateCharacter(expression){
    currentCharacter = currentCharacter.slice(0,1).toLowerCase() + currentCharacter.slice(1);
    expression = expression.slice(0,1).toUpperCase() + expression.slice(1);
    updateImage(expression);
    playSound(expression);
}

function updateImage(expression){
    characterImage.src = `./images/${currentCharacter}${expression}.png`;
}

function playSound(expression){
    const audio = new Audio(`./sounds/${currentCharacter}${expression}.ogg`);
    audio.play();
}

function checkEasterEgg(nextOperator = true){
    if(result === "100")
        updateCharacter("Shocked");
    else if(inputArray.join("") === "1+1")
        updateCharacter("Disappointed");
    else if(!nextOperator) updateCharacter("Happy");
}

