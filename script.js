const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const backspaceButton = document.querySelector("#backspace");
const allClearButton = document.querySelector("#allClear");
const equalButton = document.querySelector("#execute");
const inputDisplay = document.querySelector("#inputDisplay");
const resultDisplay = document.querySelector("#resultDisplay");

//index 0 stores first number, index 1 stores operator, index 2 stores second number.
//The reason it's implemented like this is so that it's easier to make the backspace function.
let inputArray = ["", "", ""];
//should always be 0 or 2, except during backspace on operand
let currentInputIndex = 0;
let result = 0;
let hasDecimalPoint = false;

for(const button of numberButtons){
    button.addEventListener("click", e => insertNumber(e.target.value));
}
for(const button of operatorButtons){
    button.addEventListener("click", e => insertOperator(e.target.value));
}
backspaceButton.addEventListener("click", clearLast);
allClearButton.addEventListener("click", clearAll);
equalButton.addEventListener("click", calculateResult);



function insertNumber(number){

}

function insertOperator(operand){

}

function calculateResult(nextOperand = false){

}

function clearLast(){

}

function clearAll(){

}

function updateDisplay(){

}