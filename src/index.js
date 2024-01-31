import './styles/index.scss';
import './styles/reset.scss';
import { main } from './components/main';
import { makeFormatedNumber } from './utils/formatNumber';
import { displayNumbers } from './utils/displayNumbers';
import { operationsWithIntegers } from './utils/operationsWithIntegers';
import { operationsWithDecimal } from './utils/operationsWithDecimal';

// Display App component
document.body.appendChild(main());

// Calculating logic
const MAX_VALUE = 13;
let firstNum = '0';
let secondNum = '';
let sign = '';
let isEnd = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
const action = ['-', '+', 'x', '/'];

// Get display menu
const displayResult = document.getElementById('display-result');

function clearAll() {
  firstNum = '';
  secondNum = '';
  sign = '';
  isEnd = false;
  displayResult.innerText = '0';
}

document.getElementById('AC').onclick = clearAll;

// set onClick on whole menu
document.querySelector('.menu').onclick = (event) => {
  // Press clear button
  if (event.target.innerText === 'AC') {
    displayResult.innerText = '0';
  }

  const key = event.target.innerText;

  // Change sign(from + to -, and form - to +)
  if (key === '+/-') {
    if ((sign === '' && secondNum === '') || (sign && secondNum === '')) {
      firstNum = makeFormatedNumber(firstNum, ',') * -1;
      firstNum = makeFormatedNumber(firstNum, '.');
      displayResult.innerText = firstNum;
    } else {
      secondNum = makeFormatedNumber(secondNum, ',') * -1;
      secondNum = makeFormatedNumber(secondNum, '.');
      displayResult.innerText = secondNum;
    }
  }

  // Press 0-9, ',' and checking if result is <= MAX_VALUE
  if (digit.includes(key) && displayResult.innerText.length <= 12) {
    if (sign === '' && secondNum === '') {
      firstNum = displayNumbers(key, firstNum);
      displayResult.innerText = firstNum;
    } else if (firstNum !== '0' && secondNum !== '0' && isEnd) {
      secondNum = key;
      isEnd = false;
      displayResult.innerText = secondNum;
    } else {
      secondNum = displayNumbers(key, secondNum);
      displayResult.innerText = secondNum;
    }
  }

  // Press any sign from ['-', '+', 'x', '/'] and display it
  if (action.includes(key)) {
    sign = key;
    displayResult.innerText = sign;
    return;
  }

  // Return the result of operation when press "="
  if (key === '=') {
    let result;
    if (!firstNum.includes(',') && !secondNum.includes(',')) {
      result = operationsWithIntegers(sign, firstNum, secondNum);
      firstNum = result[0];
      secondNum = result[1];
      if (firstNum.length >= MAX_VALUE) {
        firstNum = firstNum.substring(0, MAX_VALUE);
      }
    } else {
      result = operationsWithDecimal(sign, firstNum, secondNum);
      firstNum = result[0];
      secondNum = result[1];
      if (firstNum.length >= MAX_VALUE) {
        firstNum = firstNum.substring(0, MAX_VALUE);
      }
    }

    // Display the result(also display Error if divide by 0)
    isEnd = true;
    if (firstNum === '' && secondNum === '') {
      displayResult.innerText = 'Error';
    } else {
      displayResult.innerText = firstNum;
    }
  }

  if (key === '%') {
    if (secondNum === '') {
      firstNum = makeFormatedNumber(firstNum, ',') / 100;
      firstNum = makeFormatedNumber(firstNum, '.');
      displayResult.innerText = firstNum;
    } else {
      secondNum = makeFormatedNumber(secondNum, ',') / 100;
      secondNum = makeFormatedNumber(secondNum, '.');
      displayResult.innerText = secondNum;
    }
  }
};
