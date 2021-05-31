import SortBase from "./SortBase.js";
import ComparingIndex from "../Index/ComparingIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import SortedIndex from "../Index/SortedIndex.js";

export default class MergeSort extends SortBase {

  getTitle() {
    return 'Merge Sort';
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

   this.visual.setSeries(this.doSort(series));
   this.visual.redraw();
  }

  doSort(array){
    const half = array.length / 2

    // Base case or terminating case
    if(array.length < 2){
      return array
    }

    const left = array.splice(0, half)
    return this.merge(this.doSort(left),this.doSort(array))
  }

  merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
      // Pick the smaller among the smallest element of left and right sub arrays
      if (left[0] < right[0]) {
        arr.push(left.shift())
      } else {
        arr.push(right.shift())
      }
    }

    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
  }

}