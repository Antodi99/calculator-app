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
