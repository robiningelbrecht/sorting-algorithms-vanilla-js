import SortBase from "./SortBase.js";
import ComparingIndex from "../Index/ComparingIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import SortedIndex from "../Index/SortedIndex.js";

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

   this.doSort(series);
   this.visual.redraw();
  }

  doSort(input){
    this.arrayLength = input.length;

    for (let i = Math.floor(this.arrayLength / 2); i >= 0; i -= 1)      {
      this.heapify(input, i);
    }

    for (let i = input.length - 1; i > 0; i--) {
      this.swap(input, 0, i);
      this.arrayLength--;
      this.heapify(input, 0);
    }
  }

  heapify(input, i) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;

    if (left < this.arrayLength && input[left] > input[max]) {
      max = left;
    }

    if (right < this.arrayLength && input[right] > input[max])     {
      max = right;
    }

    if (max !== i) {
      this.swap(input, i, max);
      this.heapify(input, max);
    }
  }

  swap(input, index_A, index_B) {
    let temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
  }

}