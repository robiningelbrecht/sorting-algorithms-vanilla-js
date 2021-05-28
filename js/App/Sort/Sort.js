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

}