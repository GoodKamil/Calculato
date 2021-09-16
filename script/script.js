const btnNumbers = document.querySelectorAll('[data-option="number"]');
const btnOperations = document.querySelectorAll('[data-option="operation"]');
const btnResult = document.querySelector('[data-option="result"]');
const textResult = document.querySelector('[data-option="text"]');
const btnDelete = document.querySelector('[data-option="delete"]');
const btnBack = document.querySelector('[data-option="back"]');
const paragraph = document.querySelector('.paragraph');

let firstNumber = '';
let secondNumber = '';
let action = '';
let result = '';
let value = '';
let flag = true;

function remove() {
  paragraph.textContent = '';
  textResult.textContent = '';
  firstNumber = '';
  secondNumber = '';
  action = '';
  result = '';
  value = '';
  flag = true;
}

btnNumbers.forEach(number => {
  number.addEventListener('click', function () {
    if (result) {
      textResult.textContent = '';
      result = '';
    }
    textResult.textContent += number.textContent;
    value = Number(textResult.textContent);
    if (flag == true) {
      paragraph.textContent = '';
      firstNumber = value;
      console.log(firstNumber);
    } else {
      secondNumber = value;
      console.log(secondNumber);
    }
  });
});

btnOperations.forEach(operation => {
  operation.addEventListener('click', function () {
    textResult.textContent = '';
    action = String(operation.textContent);
    paragraph.textContent = `${value}${action}`;
    flag = !flag;
  });
});

btnResult.addEventListener('click', function () {
  if (firstNumber && secondNumber && action) {
    switch (action) {
      case 'x':
        result = firstNumber * secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;

      default:
        return;
    }
    textResult.textContent = result;
    paragraph.textContent = '';
    flag = !flag;
    firstNumber = '';
    secondNumber = '';
  } else console.log('błąd');
});

btnDelete.addEventListener('click', remove);
