import Utils from "./Utils.js";

export default class App {
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
}