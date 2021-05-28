export default class Sort {

  constructor(visual, speed) {
    this.visual = visual;
    this.speed = speed;
    this.isRunning = false;
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
    this.visual.setComparingIndexes(false);
    this.visual.setSwappingIndexes(false);
    this.visual.setSortedIndexes(false);

    // Do sorting.
    await this.doRun();

    // Complete visual.
    this.visual.setComparingIndexes(false);
    this.visual.setSwappingIndexes(false);
    this.visual.setSortedIndexes(this.visual.getSeries().map(function (_, i) {
      return i
    }));
    this.visual.redraw();
    this.setSorting(false);
  }

  async doRun() {
    // Child class should implement this.
  }


}