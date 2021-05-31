import SortBase from "./SortBase.js";
import ComparingIndex from "../Index/ComparingIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import SortedIndex from "../Index/SortedIndex.js";
import Utils from "../Utils.js";

export default class HeapSort extends SortBase {

  constructor(visual, speed) {
    super(visual, speed);
    this.arrayLength = null;
  }

  getTitle() {
    return 'Heap Sort';
  }

  getAvailableIndexTypes() {
    return [
      new SortedIndex([]),
      new ComparingIndex([]),
      new SwappingIndex([]),
    ];
  }

  async doRun() {
    let series = this.visual.getSeries();

    await this.doSort(series);
  }

  async doSort(input) {
    this.arrayLength = input.length;

    for (let i = Math.floor(this.arrayLength / 2); i >= 0; i -= 1) {
      await this.heapify(input, i);
    }

    for (let i = input.length - 1; i > 0; i--) {
      await this.swap(input, 0, i);
      this.arrayLength--;
      await this.heapify(input, 0);
    }
  }

  async heapify(input, i) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;

    if (left < this.arrayLength && input[left] > input[max]) {
      this.visual.setIndexes([new ComparingIndex([left, i]), new SwappingIndex([])])
      this.visual.redraw();
      await Utils.sleep(this.speed);
      max = left;
    }

    if (right < this.arrayLength && input[right] > input[max]) {
      this.visual.setIndexes([new ComparingIndex([right, i]), new SwappingIndex([])])
      this.visual.redraw();
      await Utils.sleep(this.speed);
      max = right;
    }

    if (max !== i) {
      await this.swap(input, i, max);
      await this.heapify(input, max);
    }
  }

  async swap(input, index_a, index_b) {
    let temp = input[index_a];

    this.visual.setIndexes([new SwappingIndex([index_a, index_b]), new ComparingIndex([])])
    this.visual.redraw();
    await Utils.sleep(this.speed);

    input[index_a] = input[index_b];
    input[index_b] = temp;

    this.visual.setIndexes([new SwappingIndex([index_a, index_b]), new ComparingIndex([])])
    this.visual.redraw();
    await Utils.sleep(this.speed);
  }

}