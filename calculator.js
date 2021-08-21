const boxes = Array.from(document.querySelectorAll(".number"));
const operations = Array.from(document.querySelectorAll(".operate"));
const clear = document.querySelector(".clear");
const clearAll = document.querySelector(".clear-all");
const displayNum = document.querySelector(".display-calc");
const displayResult = document.querySelector(".display-result");
const result = document.querySelector(".result");

let arrNum = [];
let storeNum = [0];
let storeNum2 = [0];
let arrOperation = [];

result.addEventListener("click", calcResult);
clearAll.addEventListener("click", restart);

boxes.forEach((box) =>
  box.addEventListener("click", () => {
    getNumber(box.dataset.number);
  })
);

operations.forEach((operation) =>
  operation.addEventListener("click", () => {
    getOperate(operation.dataset.operate);
  })
);

function getNumber(playerSelect) {
  let convertNum = Number(playerSelect);

  if (arrOperation.length !== 0 && storeNum !== 0) {
    storeNum2[storeNum2.length - 1] =
      storeNum2[storeNum2.length - 1] * 10 + convertNum;

    updateDisplay(storeNum2, arrOperation[0]);
  } else {
    storeNum[storeNum.length - 1] =
      storeNum[storeNum.length - 1] * 10 + convertNum;
  }

  console.log("storeNum: " + storeNum + ", storeNum2: " + storeNum2);
  showDisplay();
}

function getOperate(playerSelect) {
  arrOperation.push(playerSelect);
  updateDisplay(storeNum, arrOperation[0]);

  if (arrOperation !== null) {
    evaluate();
  }
}

function evaluate() {
  // if arrOperation array has more than 2 indexes then delete the first index
  if (arrOperation.length > 2) {
    arrOperation.shift();
  }
  // if storeNum2 has value run function operate()
  if (storeNum2 > 0) {
    operate(arrOperation[0], storeNum, storeNum2);
  }
  console.log("arrOperation before: " + arrOperation);
}

function calcResult() {
  // if arrOperation has 2 indexes, then delete the index[0] so that the chosen operator will be run
  if (arrOperation.length >= 2) {
    arrOperation.shift();
  }
  evaluate();
}

function operate(operator, number1, number2) {
  let operator1 = operator;
  number1 = Number(number1);
  number2 = Number(number2);

  switch (operator1) {
    case "+":
      tambah(number1, number2);
      break;

    case "-":
      kurang(number1, number2);
      break;

    case "*":
      kali(number1, number2);
      break;

    case "/":
      bagi(number1, number2);
      break;

    case "%":
      modulo(number1, number2);
      break;
  }
}

function showDisplay() {
  displayResult.innerText = storeNum;
}

function updateDisplay(sum, operator) {
  if ((storeNum2 <= 0) & (arrOperation.length < 2)) {
    displayNum.innerText = sum + " " + operator;
    displayResult.innerText = sum;
  } else if (arrOperation.length >= 2 && storeNum2 > 0) {
    displayNum.innerText = storeNum + " " + arrOperation[1] + " " + storeNum2;
    displayResult.innerText = sum;
  } else if (arrOperation.length >= 2) {
    displayNum.innerText = storeNum + " " + arrOperation[1];
    displayResult.innerText = sum;
  } else if (storeNum2 > 0) {
    displayNum.innerText = storeNum + " " + arrOperation + " " + sum;
    displayResult.innerText = sum;
  }
}

function restart(e) {
  displayNum.innerText = storeNum;
  displayResult.innerText = storeNum;
}

function kurang(number1, number2) {
  let sum = number1 - number2;
  storeNum = sum;
  storeNum2 = [0];
  console.log(sum);

  updateDisplay(sum, arrOperation);
}

function kali(number1, number2) {
  let sum = number1 * number2;
  storeNum = sum;
  storeNum2 = [0];
  console.log(sum);

  updateDisplay(sum, arrOperation);
}

function bagi(number1, number2) {
  let sum = number1 / number2;
  storeNum = sum;
  storeNum2 = [0];
  console.log(sum);

  updateDisplay(sum, arrOperation);
}

function modulo(number1, number2) {
  let sum = number1 % number2;
  storeNum = sum;
  storeNum2 = [0];
  console.log(sum);

  updateDisplay(sum, arrOperation);
}

function tambah(number1, number2) {
  let sum = number1 + number2;
  storeNum = sum;
  storeNum2 = [0];
  console.log(sum);

  updateDisplay(sum, arrOperation);
}
