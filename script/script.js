const btnNumbers = document.querySelectorAll('[data-option="number"]');
const btnOperations = document.querySelectorAll('[data-option="operation"]');
const btnResult = document.querySelector('[data-option="result"]');
const textResult = document.querySelector('[data-option="text"]');
const btnDelete = document.querySelector('[data-option="delete"]');
const btnBack = document.querySelector('[data-option="back"]');
const paragraph = document.querySelector('.paragraph');

let numberOperation = [];
let action = '';
let result = '';
let value = '';
let sum = '';
let counter = 0;

function refresh() {
  numberOperation = [];
  action = '';
  result = '';
  value = '';
  sum = '';
  counter = 0;
  textResult.textContent = 0;
  paragraph.textContent = '';
}

function undo() {
  const size = textResult.textContent.length;
  const helpfulVariable = textResult.textContent.slice(0, -1);
  textResult.textContent = helpfulVariable == 0 ? 0 : helpfulVariable;
  value = helpfulVariable;
  console.log(value);
}

function condition(char) {
  switch (char) {
    case 'x':
      result = value ? Number(result) * Number(value) : Number(result);
      break;
    case '-':
      result = Number(result) - Number(value);
      break;
    case '+':
      result = Number(result) + Number(value);
      break;
    case '/':
      if (value == 0) return;
      else result = Number(result) / Number(value);
      break;

    default:
      return;
  }
  textResult.textContent = result;
  paragraph.textContent = `${result}${action}`;

  return result;
}

function equal() {
  const helpfulVariable = result;
  condition(action);
  if (value == 0) return;
  else paragraph.textContent = `${helpfulVariable} ${action} ${value} =`;
  console.log(helpfulVariable);
  value = '';
}

btnNumbers.forEach(number => {
  number.addEventListener('click', function () {
    value += number.textContent;
    textResult.textContent = value;
  });
});

btnOperations.forEach(operation => {
  operation.addEventListener('click', function () {
    action = operation.textContent;
    numberOperation.push(action);
    console.log(numberOperation);

    if (result) {
      sum = condition(numberOperation[counter - 1]);
    } else {
      result = value;
      paragraph.textContent = `${value}${action}`;
    }

    value = '';
    counter++;
  });
});

btnResult.addEventListener('click', equal);

btnDelete.addEventListener('click', refresh);

btnBack.addEventListener('click', undo);

// function clear(text) {
//   textResult.textContent = text;
//   firstNumber = '';
//   secondNumber = '';
//   paragraph.textContent = '';
//   flag = !flag;
// }

// function remove() {
//   paragraph.textContent = '';
//   textResult.textContent = '';
//   firstNumber = '';
//   secondNumber = '';
//   action = '';
//   result = '';
//   numberClick = '';
//   value = '';
//   sum = '';
//   flag = true;
// }

// btnNumbers.forEach(number => {
//   number.addEventListener('click', function () {
//     if (result) {
//       textResult.textContent = '';
//       result = '';
//     }

//     if (sum && flag) {
//       textResult.textContent = '';
//       sum = '';
//     }

//     numberClick = number.textContent;
//     textResult.textContent += numberClick;
//     value = Number(textResult.textContent);
//     if (flag == true) {
//       paragraph.textContent = '';
//       firstNumber = value;
//     } else {
//       secondNumber = value;
//     }
//   });
// });

// btnOperations.forEach(operation => {
//   operation.addEventListener('click', function () {
//     textResult.textContent = '';
//     if (value) {
//       action = String(operation.textContent);
//       paragraph.textContent = sum ? `${sum}${action}` : `${value}${action}`;
//       flag = !flag;
//     }
//   });
// });

// btnResult.addEventListener('click', function () {
//   if (firstNumber && secondNumber && action) {
//     result = condition(action, firstNumber);
//     clear(result);
//     sum = result;
//   } else if (secondNumber && sum && action) {
//     sum = condition(action, sum);
//     clear(sum);
//   } else console.log('błąd');
// });

// btnDelete.addEventListener('click', remove);

// btnBack.addEventListener('click', function () {
//   const texts = textResult.textContent;
//   textResult.textContent = texts.slice(0, texts.length - 1);
//   value = Number(textResult.textContent);
//   flag ? firstNumber == value : (secondNumber = value);
// });
