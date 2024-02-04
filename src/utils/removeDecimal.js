export function removeDecimal(number) {
  let [integerPart, decimalPart] = number.split(',');

  if (decimalPart) {
    for (let i = decimalPart.length; i < 5; i++) {
      decimalPart += '0';
    }
    return Number(integerPart.concat(decimalPart.substring(0, 5)));
  } else {
    for (let i = 0; i < 5; i++) {
      integerPart += '0';
    }
    return Number(integerPart);
  }
}
