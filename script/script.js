const btnNumbers = document.querySelectorAll('[data-option="number"]');
const btnOperations = document.querySelectorAll('[data-option="operation"]');
const btnResult = document.querySelector('[data-option="result"]');
const textResult = document.querySelector('[data-option="text"]');
const btnDelete = document.querySelector('[data-option="delete"]');
const btnBack = document.querySelector('[data-option="back"]');
const paragraph = document.querySelector('.paragraph');

let numberClick = '';
let firstNumber = '';
let secondNumber = '';
let action = '';
let result = '';
let value = '';
let sum = '';
let flag = true;

function condition(char, number) {
  switch (char) {
    case 'x':
      score = number * secondNumber;
      break;
    case '-':
      score = number - secondNumber;
      break;
    case '+':
      score = number + secondNumber;
      break;
    case '/':
      score = number / secondNumber;
      break;

    default:
      return;
  }
  return score;
}

function clear(text) {
  textResult.textContent = text;
  firstNumber = '';
  secondNumber = '';
  paragraph.textContent = '';
  flag = !flag;
}

function remove() {
  paragraph.textContent = '';
  textResult.textContent = '';
  firstNumber = '';
  secondNumber = '';
  action = '';
  result = '';
  numberClick = '';
  value = '';
  sum = '';
  flag = true;
}

btnNumbers.forEach(number => {
  number.addEventListener('click', function () {
    if (result) {
      textResult.textContent = '';
      result = '';
    }

    if (sum && flag) {
      textResult.textContent = '';
      sum = '';
    }

    numberClick = number.textContent;
    textResult.textContent += numberClick;
    value = Number(textResult.textContent);
    if (flag == true) {
      paragraph.textContent = '';
      firstNumber = value;
    } else {
      secondNumber = value;
    }
  });
});

btnOperations.forEach(operation => {
  operation.addEventListener('click', function () {
    textResult.textContent = '';
    if (value) {
      action = String(operation.textContent);
      paragraph.textContent = sum ? `${sum}${action}` : `${value}${action}`;
      flag = !flag;
    }
  });
});

btnResult.addEventListener('click', function () {
  if (firstNumber && secondNumber && action) {
    result = condition(action, firstNumber);
    clear(result);
    sum = result;
  } else if (secondNumber && sum && action) {
    sum = condition(action, sum);
    clear(sum);
  } else console.log('błąd');
});

btnDelete.addEventListener('click', remove);

btnBack.addEventListener('click', function () {
  const texts = textResult.textContent;
  textResult.textContent = texts.slice(0, texts.length - 1);
  value = Number(textResult.textContent);
  flag ? firstNumber == value : (secondNumber = value);
});
