export function powerOfTen(n) {
  let result = 1;

  if (n === 0) {
    return 1;
  }

  for (let i = 0; i < n; i++) {
    result *= 10;
  }

  return result;
}

export function removeDecimal(num, MAX_VALUE_DECIMAL) {
  if (num.includes(',')) {
    num = Number(num.replace(',', '.')) * powerOfTen(MAX_VALUE_DECIMAL);
    num = Number(num.toString().split('.')[0]);
  } else {
    num = Number(num) * powerOfTen(MAX_VALUE_DECIMAL);
  }

  return num;
}
