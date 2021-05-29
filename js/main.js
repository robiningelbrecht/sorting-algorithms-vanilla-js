import App from "./App/App.js";
import VisualFactory from "./App/Factory/VisualFactory.js";
import SortFactory from "./App/Factory/SortFactory.js";

let root = document.getElementById('visualize');
let series_length = 30;

// Init the visual and the app.
let app = new App(
  SortFactory.create(
    'bubble-sort',
    VisualFactory.create('vertical-bars', root, series_length),
    document.querySelector("input.speed").value
  )
);
app.randomizeVisual();

// Add event listener to update algorithm.
let algorithm_select = document.querySelector("select.algorithm");
algorithm_select.addEventListener('change', (e) => {
  app.updateSort(SortFactory.createFromAppState(e.target.value, app));
  document.querySelector("div.card-header").innerHTML = app.sort.getTitle();
});

// Add event listener to update visual.
let visual_select = document.querySelector("select.visual");
visual_select.addEventListener('change', (e) => {
  app.updateVisual(VisualFactory.create(e.target.value, root, series_length));
});

// Add event listener to update sorting speed.
let speed_input = document.querySelector("input.speed");
speed_input.addEventListener('blur', (e) => {
  app.updateSortingSpeed(e.target.value);
});

// Add event listener to randomize data.
let button_randomize = document.querySelector("button.randomize");
button_randomize.addEventListener('click', () => {
  app.randomizeVisual(false);
});

// Add event listener to run the selected sorting algorithm.
let button_run = document.querySelector("button.run");
button_run.addEventListener('click', () => {
  app.runSort();
});

// Add event listeners to enable / disable input.
let body = document.querySelector("body");
let dependees = [algorithm_select, visual_select, button_randomize, button_run];

body.addEventListener('SortingStarted', () => {
  dependees.forEach((dependee) => {
    dependee.setAttribute('disabled', 'disabled');
  });

  button_run.querySelector('span.icon').classList.add('d-none');
  button_run.querySelector('span.icon').classList.remove('d-inline-block');
  button_run.querySelector('span.spinner').classList.add('d-inline-block')
  button_run.querySelector('span.spinner').classList.remove('d-none');
});
body.addEventListener('SortingCompleted', () => {
  dependees.forEach((dependee) => {
    dependee.removeAttribute('disabled');
  });

  button_run.querySelector('span.icon').classList.add('d-inline-none');
  button_run.querySelector('span.icon').classList.remove('d-none');
  button_run.querySelector('span.spinner').classList.add('d-none')
  button_run.querySelector('span.spinner').classList.remove('d-inline-block');
});
