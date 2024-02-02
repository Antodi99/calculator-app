import { makeFormatedNumber } from './formatNumber';
import { powerOfTen, removeDecimal } from './removeDecimal';

export function operationsWithDecimal(sign, num1, num2) {
  const MAX_VALUE_DECIMAL = 5;

  let firstNum = removeDecimal(num1, MAX_VALUE_DECIMAL);
  let secondNum = removeDecimal(num2, MAX_VALUE_DECIMAL);

  switch (sign) {
    case '+':
      firstNum = (firstNum + secondNum) / powerOfTen(MAX_VALUE_DECIMAL);
      break;
    case '-':
      console.log(firstNum, secondNum);
      firstNum = (firstNum - secondNum) / powerOfTen(MAX_VALUE_DECIMAL);
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
      firstNum = (firstNum * secondNum) / powerOfTen(MAX_VALUE_DECIMAL) ** 2;
      break;
    case '%':
      firstNum = firstNum / powerOfTen(MAX_VALUE_DECIMAL) / 100;
  }
  firstNum = makeFormatedNumber(firstNum, '.');
  return firstNum;
}
