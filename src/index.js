import './styles/index.scss';
import './styles/reset.scss';
import { main } from './components/main';
import { eventsOnButtons } from './utils/eventsOnButtons';

// Display App component
document.body.appendChild(main());

// Get display menu
export const displayResult = document.getElementById('display-result');

// set onClick on buttons
document.querySelector('.menu').onclick = (event) => {
  eventsOnButtons(event, 'button');
};

document.body.onkeydown = (event) => {
  eventsOnButtons(event, 'keydown');
};
