import { operationsWithDecimal } from './operationsWithDecimal';
import { operationsWithIntegers } from './operationsWithIntegers';

export function calculate(firstNum, secondNum, sign) {
  if (secondNum === '' || sign === '') {
    return firstNum;
  }

  if (!firstNum.includes(',') && !secondNum.includes(',')) {
    return operationsWithIntegers(sign, firstNum, secondNum);
  }
  return operationsWithDecimal(sign, firstNum, secondNum);
}
