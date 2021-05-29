import Utils from "./Utils.js";

export default class App {
  constructor(visual, speed) {
    this.visual = visual;
    this.speed = speed;
    this.sort = null;
  }

  updateAlgorithm(algorithm) {
    if (this.sort && this.sort.isSorting()) {
      return;
    }

    this.sort = algorithm;

    this.randomizeVisual();
  }

  updateVisual(visual) {
    if (this.sort && this.sort.isSorting()) {
      return;
    }

    this.visual = visual;

    if (this.sort) {
      this.sort.setVisual(visual);
    }

    this.randomizeVisual();
  }

  runSort() {
    if (!this.sort) {
      return;
    }

    if (this.sort.isSorting()) {
      return;
    }

    this.sort.run();
  }

  randomizeVisual() {
    if (!this.sort) {
      return;
    }

    if (this.sort && this.sort.isSorting()) {
      return;
    }

    this.visual.setAvailableIndexTypes(this.sort.getAvailableIndexTypes());
    this.visual.setSeries(Utils.getRandomSeries(this.visual.series.length));
    this.visual.resetIndexes();
    this.visual.draw();
  }

  updateSortingSpeed(speed) {
    this.speed = speed;

    if (!this.sort) {
      return;
    }
    this.sort.setSpeed(speed);
  }
}