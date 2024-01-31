export function displayNumbers(key, number) {
  if (key === ',') {
    if (!number.includes(',')) {
      if (number === '') {
        number += '0';
      }
      number += key;
    }
  } else {
    number += key;
  }

  // Fixing problem with leading zeros and zeros with ','
  if (
    number.length > 1 &&
    number.charAt(0) === '0' &&
    number.charAt(1) == ','
  ) {
    return number;
  }
  if (number.length > 1 && number.charAt(0) === '0' && key === '0') {
    number = `${number.replace(/(?<=^|-)0+/, '')}0`;
  } else if (number.length > 1 && number.charAt(0) === '0') {
    number = number.replace(/(?<=^|-)0+/, '');
  }

  return number;
}
