import { displayResult } from '..';
import { displayNumbers } from './displayNumbers';
import { makeFormatedNumber } from './formatNumber';
import { operationsWithDecimal } from './operationsWithDecimal';
import { operationsWithIntegers } from './operationsWithIntegers';

// Constants for calculating
const MAX_VALUE = 13;
let firstNum = '0';
let secondNum = '';
let sign = '';
let isEnd = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
const action = ['-', '+', 'x', '/'];

// Function that clean display
function clearAll() {
  firstNum = '';
  secondNum = '';
  sign = '';
  isEnd = false;
  displayResult.innerText = '0';
}

export function eventsOnButtons(event, pressed) {
  let key;

  if (pressed === 'button') {
    key = event.target.innerText;
  } else {
    key = event.key;
  }

  if (key === 'AC' || key === 'Backspace') {
    event.preventDefault();
    clearAll();
  }

  // Change sign(from + to -, and form - to +)
  if (key === '+/-') {
    event.preventDefault();
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
  if (
    (digit.includes(key) && displayResult.innerText.length <= 12) ||
    key === '.'
  ) {
    event.preventDefault();

    if (key === '.') {
      key = ',';
    }

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
  if (action.includes(key) || key === '*') {
    event.preventDefault();
    if (key === '*') {
      key = 'x';
    }
    sign = key;
    displayResult.innerText = sign;
    return;
  }

  // Return the result of operation when press "="
  if (key === '=' || key === 'Enter') {
    event.preventDefault();
    let result;

    if (secondNum === '') {
      displayResult.innerText = firstNum;
    }

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
    event.preventDefault();
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
}
