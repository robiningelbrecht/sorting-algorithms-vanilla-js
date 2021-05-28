import SortedIndex from "../Index/CompletedIndex.js";

export default class Sort {

  constructor(visual, speed) {
    this.visual = visual;
    this.speed = speed;
    this.isRunning = false;
  }

  setVisual(visual){
    this.visual = visual;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  isSorting() {
    return this.isRunning;
  }

  setSorting(flag) {
    if (flag) {
      document.querySelector('body').dispatchEvent(new CustomEvent('SortingStarted'))
    } else {
      document.querySelector('body').dispatchEvent(new CustomEvent('SortingCompleted'))
    }

    this.isRunning = flag;
  }

  async run() {
    // Init visual.
    this.setSorting(true);
    this.visual.resetIndexes();

    // Do sorting.
    await this.doRun();

    // Complete visual.
    this.visual.resetIndexes();
    this.visual.setIndexes([new SortedIndex(this.visual.getSeries().map(function (_, i) {
      return i
    }))])

    this.visual.redraw();
    this.setSorting(false);
  }

  async doRun() {
    // Child class should implement this.
  }


}