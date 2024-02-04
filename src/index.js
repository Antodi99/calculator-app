import './styles/index.scss';
import './styles/reset.scss';
import { main } from './components/main';
import { eventsOnButtons } from './utils/eventsOnButtons';

// display App component
document.body.appendChild(main());

// get display menu
export const displayResult = document.getElementById('display-result');
const buttons = document.getElementsByTagName('button');

// function for preventing focus on buttons
function preventFocus(buttons) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].blur();
  }
}

// set onClick on buttons
document.querySelector('.menu').onclick = (event) => {
  eventsOnButtons(event, 'button');
  preventFocus(buttons);
};

document.body.onkeydown = (event) => {
  eventsOnButtons(event, 'keydown');
  preventFocus(buttons);
};
