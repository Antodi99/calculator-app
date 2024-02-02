import { displayResult } from '..';
import { displayNumbers } from './displayNumbers';
import {
  formatPercentOperation,
  isOnlyZeros,
  makeFormatedNumber,
} from './formatNumber';
import { isEqual } from './isEqual';

// Constants for calculating
const MAX_VALUE = 13;
let firstNum = '0';
let secondNum = '';
let sign = '';
let newSign = '';
let isEnd = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
const action = ['-', '+', 'x', '/'];

// Function that clean display
function clearAll() {
  firstNum = '';
  secondNum = '';
  sign = '';
  newSign = '';
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
    if (sign && firstNum && secondNum) {
      newSign = key;
    }
    if (newSign) {
      const result = isEqual(event, firstNum, secondNum, sign, MAX_VALUE);
      firstNum = result[0];
      secondNum = result[1];
      newSign = sign;
      newSign = '';
    }
    sign = key;
    displayResult.innerText = sign;
    return;
  }

  // Return the result of operation when press "="
  if (key === '=' || key === 'Enter') {
    const result = isEqual(event, firstNum, secondNum, sign, MAX_VALUE);
    firstNum = result[0];
    secondNum = result[1];
    if (result) {
      displayResult.innerText = firstNum;
    }
  }

  if (key === '%') {
    event.preventDefault();
    if (secondNum === '') {
      firstNum = formatPercentOperation(firstNum);
      if (isOnlyZeros(firstNum)) {
        clearAll();
        firstNum = '0';
      }
      displayResult.innerText = firstNum;
    } else {
      secondNum = formatPercentOperation(secondNum);
      if (isOnlyZeros(secondNum)) {
        secondNum = '0';
      }
      displayResult.innerText = secondNum;
    }
  }
}
