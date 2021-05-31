import SortBase from "./SortBase.js";
import ComparingIndex from "../Index/ComparingIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import SortedIndex from "../Index/SortedIndex.js";

export default class InsertionSort extends SortBase {

  getTitle() {
    return 'Insertion Sort';
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
    let n = series.length;

    for (let i = 1; i < n; i++) {
      // Choosing the first element in our unsorted subarray
      let current = series[i];
      // The last element of our sorted subarray
      let j = i - 1;
      while ((j > -1) && (current < series[j])) {
        series[j + 1] = series[j];
        j--;
      }
      series[j + 1] = current;
    }
  }

}