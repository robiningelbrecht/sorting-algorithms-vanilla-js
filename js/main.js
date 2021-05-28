import Utils from './App/Utils.js'
import Visual from './App/Visual.js'
import App from "./App/App.js";

// Init the visual and the app.
let visual = new Visual(
  document.getElementById('visualize'),
  Utils.getRandomSeries(30)
);
let speed = document.querySelector("input.speed").value;

let app = new App(visual, speed);

// Add event listener to update algorithm.
let algorithm_select = document.querySelector("select.algorithm");
algorithm_select.addEventListener('change', (e) => {
  app.updateAlgorithm(e.target.value);
  document.querySelector("div.card-header").innerHTML = app.sort.getTitle();
});

// Add event listener to update sorting speed.
document.querySelector("input.speed").addEventListener('blur', (e) => {
  app.updateSortingSpeed(e.target.value);
});

// Add event listener to randomize data.
let button_randomize = document.querySelector("button.randomize");
button_randomize.addEventListener('click', () => {
  app.randomizeVisual();
});

// Add event listener to run the selected sorting algorithm.
let button_run = document.querySelector("button.run");
button_run.addEventListener('click', () => {
  app.runSort();
});

// Add event listeners to enable / disable input.
let body = document.querySelector("body");
body.addEventListener('SortingStarted', () => {
  algorithm_select.setAttribute('disabled', 'disabled');
  button_randomize.setAttribute('disabled', 'disabled');
  button_run.setAttribute('disabled', 'disabled');
});
body.addEventListener('SortingCompleted', () => {
  algorithm_select.removeAttribute('disabled');
  button_randomize.removeAttribute('disabled');
  button_run.removeAttribute('disabled');
});
