import { makeFormatedNumber } from './formatNumber';

export function operationsWithIntegers(sign, firstNum, secondNum) {
  firstNum = makeFormatedNumber(firstNum, ',');
  secondNum = makeFormatedNumber(secondNum, ',');

  switch (sign) {
    case '+':
      firstNum += secondNum;
      break;
    case '-':
      firstNum -= secondNum;
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
      firstNum *= secondNum;
      break;
  }

  if (firstNum > Number.MAX_SAFE_INTEGER) {
    return 'Error';
  }

  firstNum = makeFormatedNumber(firstNum, '.');

  return firstNum;
}
