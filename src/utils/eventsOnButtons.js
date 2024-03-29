import { displayResult } from '..';
import { displayNumbers } from './displayNumbers';
import { formatDisplay, makeFormatedNumber } from './formatNumber';
import { calculate } from './calculate';

// Constants for calculating
const MAX_VALUE = 13;
let firstNum = '0';
let secondNum = '';
let prevNum = '';
let prevSign = '';
let sign = '';
let isEnd = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
const action = ['-', '+', 'x', '/', '*'];

// Function that clean display
function clearAll() {
  firstNum = '';
  secondNum = '';
  sign = '';
  prevNum = '';
  prevSign = '';
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

  if (key === 'AC' || key === 'Backspace' || key === 'Delete') {
    event.preventDefault();
    clearAll();
    firstNum = '0';
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
  if (action.includes(key)) {
    event.preventDefault();
    if (key === '*') {
      key = 'x';
    }
    if (sign && firstNum && secondNum) {
      firstNum = calculate(firstNum, secondNum, sign);
      secondNum = '';
      displayResult.innerText = formatDisplay(firstNum, MAX_VALUE);
    }
    sign = key;
    return;
  }

  if (firstNum === 'Error') {
    clearAll();
    firstNum = '0';
  }

  // Return the result of operation when press "="
  if (key === '=' || key === 'Enter') {
    if (!secondNum && prevNum && prevSign) {
      firstNum = calculate(firstNum, prevNum, prevSign);
    } else if (secondNum && sign) {
      firstNum = calculate(firstNum, secondNum, sign);
      prevNum = secondNum;
      prevSign = sign;
      secondNum = '';
    }
    displayResult.innerText = formatDisplay(firstNum, MAX_VALUE);
  }

  // Return number / 100 when press '%'
  if (key === '%') {
    event.preventDefault();
    if (secondNum === '') {
      if (firstNum.includes(',')) {
        let [integerPart, decimalPart] = firstNum.split(',');

        if (decimalPart.length >= 4) {
          decimalPart = decimalPart.substring(0, 5);
          firstNum = [integerPart, decimalPart].join(',');
          return;
        }
      }
      firstNum = calculate(firstNum, '100', '/');
      displayResult.innerText = firstNum;
    } else {
      if (secondNum.includes(',')) {
        let [integerPart, decimalPart] = secondNum.split(',');

        if (decimalPart.length >= 4) {
          decimalPart = decimalPart.substring(0, 5);
          secondNum = [integerPart, decimalPart].join(',');
          return;
        }
      }
      secondNum = calculate(secondNum, '100', '/');
      displayResult.innerText = secondNum;
    }
  }
}
