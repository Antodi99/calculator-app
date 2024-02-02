export function removeDecimal(number) {
  let [integerPart, decimalPart] = number.split(',');

  if (decimalPart) {
    for (let i = decimalPart.length; i < 5; i++) {
      decimalPart += '0';
    }
    return Number(integerPart.concat(decimalPart));
  } else {
    for (let i = 0; i < 5; i++) {
      integerPart += '0';
    }
    return Number(integerPart);
  }
}
