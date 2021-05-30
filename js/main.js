import App from "./App/App.js";
import VisualFactory from "./App/Factory/VisualFactory.js";
import SortFactory from "./App/Factory/SortFactory.js";

let root = document.getElementById('visualize');
let series_length = 30;

// Init the visual and the app.
let app = App.load(root) || new App(
  SortFactory.create(
    'BubbleSort',
    VisualFactory.create('VerticalBarVisual', root, series_length),
    2000,
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
  app.randomizeVisual();
});

// Add event listener to run the selected sorting algorithm.
let button_run = document.querySelector("button.run");
button_run.addEventListener('click', () => {
  app.runSort();
});

let button_sort_stop = document.querySelector("button.sort-stop");
button_sort_stop.addEventListener('click', () => {
  app.save();
  window.location.reload(true);
});

// Init input.
algorithm_select.value = app.sort.constructor.name;
speed_input.value = app.sort.speed;
visual_select.value = app.visual.constructor.name;

// Add event listeners to enable / disable input while sorting.
let body = document.querySelector("body");
let dependees = [algorithm_select, visual_select, button_randomize, button_run];

body.addEventListener('SortingStarted', () => {
  dependees.forEach((dependee) => {
    dependee.setAttribute('disabled', 'disabled');
  });

  button_run.classList.add('d-none');
  button_run.classList.remove('d-inline-block');
  button_sort_stop.classList.add('d-inline-block')
  button_sort_stop.classList.remove('d-none');
});
body.addEventListener('SortingCompleted', () => {
  dependees.forEach((dependee) => {
    dependee.removeAttribute('disabled');
  });

  button_run.classList.add('d-inline-none');
  button_run.classList.remove('d-none');
  button_sort_stop.classList.add('d-none')
  button_sort_stop.classList.remove('d-inline-block');
});
