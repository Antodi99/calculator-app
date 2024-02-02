export function makeFormatedNumber(number, sign) {
  if (sign === ',' && number.includes(',')) {
    number = Number(number.replace(',', '.'));
  } else if (sign === ',') {
    number = Number(number);
  }

  if (sign === '.' && String(number).includes('.')) {
    number = String(number).replace('.', ',');
  } else if (sign === '.') {
    number = String(number);
  }

  return number;
}

export function formatDisplay(number, MAX_VALUE) {
  let [integerPart, decimalPart] = number.split(',');

  if (number.length >= MAX_VALUE) {
    if (number.includes(',')) {
      decimalPart = decimalPart.substring(0, 5);
      number = [integerPart, decimalPart].join(',');
    }
    number = number.substring(0, MAX_VALUE);
  }
  return number;
}

export function formatPercentOperation(number) {
  if (number.includes(',')) {
    if (number.split(',')[1].length >= 4) {
      return number.substring(0, number.split(',')[0].length + 6);
    }
  }
  number = makeFormatedNumber(number, ',') / 100;
  number = makeFormatedNumber(number, '.');
  return number;
}

export function isOnlyZeros(number) {
  const numberArr = number.split(',')[1];

  if (number === '0') {
    return false;
  }

  for (let i = 0; i < numberArr.length; i++) {
    if (numberArr[i] !== '0') {
      return false;
    }
  }
  return true;
}
