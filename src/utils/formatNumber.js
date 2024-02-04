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
