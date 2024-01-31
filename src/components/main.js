import { createButton } from './button';

export function main() {
  const app = document.createElement('div');
  app.classList.add('app');

  // Change theme button
  const changeThemeButton = document.createElement('button');
  changeThemeButton.classList.add('theme-menu-button');
  changeThemeButton.innerText = 'Light';
  const changeThemeIcon = document.createElement('i');
  changeThemeIcon.classList.add('sun');

  changeThemeButton.appendChild(changeThemeIcon);

  // Change Theme logick onClick
  let stateTheme = 'dark';
  const node = document.getElementsByClassName('button');

  changeThemeButton.onclick = () => {
    if (stateTheme === 'dark') {
      stateTheme = 'light';

      for (let i = 0; i < node.length; i++) {
        if (node[i].classList.contains('button-dark')) {
          node[i].classList.remove('button-dark');
          node[i].classList.add('button-light');
        }
        if (node[i].classList.contains('button-dark-big')) {
          node[i].classList.remove('button-dark-big');
          node[i].classList.add('button-light-big');
        }
        node[i].classList.add('button-ligt-text');
        node[i].classList.add('button-light-hover');
      }

      changeThemeButton.innerText = 'Dark';
      changeThemeButton.classList.add('theme-menu-button-dark');

      changeThemeIcon.classList.remove('sun');
      changeThemeIcon.classList.add('moon');
      changeThemeButton.appendChild(changeThemeIcon);

      app.classList.add('app-light');
      calculatorBody.classList.add('light');
      result.classList.add('light');
    } else if (stateTheme === 'light') {
      stateTheme = 'dark';

      for (let i = 0; i < node.length; i++) {
        if (node[i].classList.contains('button-light')) {
          node[i].classList.remove('button-light');
          node[i].classList.add('button-dark');
        }
        if (node[i].classList.contains('button-light-big')) {
          node[i].classList.remove('button-light-big');
          node[i].classList.add('button-dark-big');
        }
        node[i].classList.remove('button-ligt-text');
        node[i].classList.remove('button-light-hover');
      }

      changeThemeButton.innerText = 'Light';
      changeThemeButton.classList.remove('theme-menu-button-dark');

      changeThemeIcon.classList.remove('moon');
      changeThemeIcon.classList.add('sun');
      changeThemeButton.appendChild(changeThemeIcon);

      app.classList.remove('app-light');
      calculatorBody.classList.remove('light');
      result.classList.remove('light');
    }
  };

  // Create main element
  const calculatorBody = document.createElement('main');
  calculatorBody.classList.add('main');

  // Create Display(Where you can see result)
  const display = document.createElement('div');
  display.classList.add('display');
  const result = document.createElement('p');
  result.classList.add('display-result');
  result.id = 'display-result';
  result.innerText = '0';
  display.appendChild(result);

  // Create Buttons
  const buttonMenu = document.createElement('div');
  buttonMenu.classList.add('menu');
  buttonMenu.id = 'button-menu';

  buttonMenu.appendChild(createButton('AC', 'dark-gray', stateTheme));
  buttonMenu.appendChild(createButton('changeSign', 'dark-gray'));
  buttonMenu.appendChild(createButton('%', 'dark-gray'));
  buttonMenu.appendChild(createButton('/', 'orange'));
  buttonMenu.appendChild(createButton('7', 'dark'));
  buttonMenu.appendChild(createButton('8', 'dark'));
  buttonMenu.appendChild(createButton('9', 'dark'));
  buttonMenu.appendChild(createButton('x', 'orange'));
  buttonMenu.appendChild(createButton('4', 'dark'));
  buttonMenu.appendChild(createButton('5', 'dark'));
  buttonMenu.appendChild(createButton('6', 'dark'));
  buttonMenu.appendChild(createButton('-', 'orange'));
  buttonMenu.appendChild(createButton('1', 'dark'));
  buttonMenu.appendChild(createButton('2', 'dark'));
  buttonMenu.appendChild(createButton('3', 'dark'));
  buttonMenu.appendChild(createButton('+', 'orange'));
  buttonMenu.appendChild(createButton('0', 'dark-big'));
  buttonMenu.appendChild(createButton(',', 'dark'));
  buttonMenu.appendChild(createButton('=', 'orange'));

  calculatorBody.appendChild(display);
  calculatorBody.appendChild(buttonMenu);

  app.appendChild(changeThemeButton);
  app.appendChild(calculatorBody);
  return app;
}
