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
        return [firstNum, secondNum];
      }
      firstNum /= secondNum;
      break;
    case 'x':
      firstNum *= secondNum;
      break;
  }

  firstNum = makeFormatedNumber(firstNum, '.');

  return firstNum;
}
