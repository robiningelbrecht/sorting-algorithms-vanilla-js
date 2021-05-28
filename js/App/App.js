import BubbleSort from "./Sort/BubbleSort.js";
import QuickSort from "./Sort/QuickSort.js";
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

    if (algorithm === 'bubble-sort') {
      this.sort = new BubbleSort(this.visual, this.speed);
    } else if (algorithm === 'quick-sort') {
      this.sort = new QuickSort(this.visual, this.speed);
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

    this.visual.setSeries(Utils.getRandomSeries(this.visual.series.length));
    this.visual.draw(this.sort.getLegend());
  }

  updateSortingSpeed(speed) {
    this.speed = speed;

    if (!this.sort) {
      return;
    }
    this.sort.setSpeed(speed);
  }
}