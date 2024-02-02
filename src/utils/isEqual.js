import { formatDisplay } from './formatNumber';
import { operationsWithDecimal } from './operationsWithDecimal';
import { operationsWithIntegers } from './operationsWithIntegers';

export function isEqual(event, firstNum, secondNum, sign, MAX_VALUE) {
  event.preventDefault();
  let result;

  if (secondNum === '' && sign === '') {
    firstNum = formatDisplay(firstNum);
    return;
  }

  if (secondNum === '') {
    secondNum = firstNum;
  }

  if (!firstNum.includes(',') && !secondNum.includes(',')) {
    result = operationsWithIntegers(sign, firstNum, secondNum);
    firstNum = formatDisplay(result[0], MAX_VALUE);
    secondNum = result[1];
  } else {
    result = operationsWithDecimal(sign, firstNum, secondNum);
    firstNum = formatDisplay(result[0], MAX_VALUE);
    secondNum = result[1];
  }

  // Display the result(also display Error if divide by 0)
  if (firstNum === '0') {
    return clearAll();
  } else if (firstNum === '' && secondNum === '') {
    return 'Error';
  } else {
    secondNum = '';
    return [firstNum, secondNum];
  }
}
