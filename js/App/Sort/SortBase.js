import SortedIndex from "../Index/SortedIndex.js";
import Utils from "../Utils.js";

export default class SortBase {

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
      document.querySelector('body').dispatchEvent(new CustomEvent('SortingStarted'));
    } else {
      document.querySelector('body').dispatchEvent(new CustomEvent('SortingCompleted'));
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
    this.visual.setIndexes([new SortedIndex(Utils.range(0, this.visual.getSeries().length - 1, 1))]);
    this.visual.redraw();
    this.setSorting(false);
  }

  async doRun() {
    // Child class should implement this.
  }


}