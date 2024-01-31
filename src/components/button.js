export function createButton(text, styles) {
  const buttonWrapper = document.createElement('button');
  const buttonText = document.createElement('p');

  buttonText.innerHTML = text;

  if (text === 'changeSign') {
    buttonText.innerHTML = '+/-';
  }

  buttonWrapper.id = text;
  buttonWrapper.classList.add('button');

  if (styles.length > 0) {
    buttonWrapper.classList.add(`button-${styles}`);
  }

  buttonWrapper.appendChild(buttonText);

  return buttonWrapper;
}
