import Utils from "./Utils.js";
import VisualFactory from "./Factory/VisualFactory.js";
import SortFactory from "./Factory/SortFactory.js";

export default class App {

  static SESSION_STORAGE_KEY = 'vannilla-js-sorting-algorithms';

  constructor(sort) {
    this.sort = sort;
    this.visual = this.sort.visual;
  }

  updateSort(sort) {
    if (this.sort.isSorting()) {
      return;
    }

    this.sort = sort;

    this.randomizeVisual();
  }

  updateVisual(visual) {
    if (this.sort.isSorting()) {
      return;
    }

    this.visual = visual;
    this.sort.setVisual(visual);

    this.randomizeVisual(true);
  }

  runSort() {
    if (this.sort.isSorting()) {
      return;
    }

    this.sort.run();
  }

  randomizeVisual(complete_redraw = false) {
    if (this.sort.isSorting()) {
      return;
    }

    this.visual.setExplanationTemplate(this.sort.constructor.name);
    this.visual.setAvailableIndexTypes(this.sort.getAvailableIndexTypes());
    this.visual.setSeries(Utils.getRandomSeries(this.visual.series.length));
    this.visual.resetIndexes();

    if (!this.visual.parent_el.querySelectorAll('.progress-vertical .progress-bar').length) {
      // Visual is not drawn yet.
      this.visual.draw();
      return;
    }

    if (complete_redraw) {
      this.visual.draw();
      return;
    }

    // Redraw visual.
    this.visual.redraw();
    this.visual.redrawMeta();
  }

  updateSortingSpeed(speed) {
    this.sort.setSpeed(speed);
  }

  save() {
    sessionStorage.setItem(App.SESSION_STORAGE_KEY, JSON.stringify({
      sort: this.sort.constructor.name,
      visual: this.visual.constructor.name,
      speed: this.sort.speed,
      series_length: this.visual.series.length,
    }));
  }

  static load(root) {
    let state = JSON.parse(sessionStorage.getItem(App.SESSION_STORAGE_KEY));

    if (state) {
      sessionStorage.removeItem(App.SESSION_STORAGE_KEY);

      return new App(
        SortFactory.create(
          state.sort,
          VisualFactory.create(state.visual, root, state.series_length),
          state.speed
        )
      );
    }

    return null;
  }
}