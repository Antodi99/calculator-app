import { makeFormatedNumber } from './formatNumber';
import { removeDecimal } from './removeDecimal';

export function operationsWithDecimal(sign, num1, num2) {
  const MAX_VALUE_DECIMAL = 100000;

  let firstNum = removeDecimal(num1);
  let secondNum = removeDecimal(num2);

  switch (sign) {
    case '+':
      firstNum = (firstNum + secondNum) / MAX_VALUE_DECIMAL;
      break;
    case '-':
      firstNum = (firstNum - secondNum) / MAX_VALUE_DECIMAL;
      break;
    case '/':
      if (secondNum === 0) {
        firstNum = '';
        secondNum = '';
        sign = '';
        return 'Error';
      }
      firstNum /= secondNum;
      break;
    case 'x':
      firstNum = (firstNum * secondNum) / MAX_VALUE_DECIMAL ** 2;
      break;
    case '%':
      firstNum = firstNum / MAX_VALUE_DECIMAL / 100;
  }

  if (
    firstNum > Number.MAX_SAFE_INTEGER ||
    firstNum < Number.MIN_SAFE_INTEGER
  ) {
    return 'Error';
  }

  firstNum = makeFormatedNumber(firstNum, '.');

  if (firstNum === 'NaN' || secondNum === 'NaN') {
    return 'Error';
  }

  return firstNum;
}
