import Utils from '../Utils.js'
import SortBase from "./SortBase.js";
import ComparingIndex from "../Index/ComparingIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import SortedIndex from "../Index/SortedIndex.js";

export default class SelectionSort extends SortBase {

  getTitle() {
    return 'Selection Sort';
  }

  getAvailableIndexTypes() {
    return [
      new SortedIndex([]),
      new ComparingIndex([]),
      new SwappingIndex([]),
    ];
  }

  async doRun() {
    this.sorted_elements = [];
    let series = this.visual.getSeries();
    let n = series.length;

    for(let i = 0; i < n; i++) {
      // Finding the smallest number in the subarray
      let min = i;
      for(let j = i+1; j < n; j++){
        this.visual.setIndexes([new ComparingIndex([min, j])])
        this.visual.redraw();
        await Utils.sleep(this.speed);

        if(series[j] < series[min]) {
          min=j;
        }
      }
      if (min !== i) {
        // Swapping the elements
        this.visual.setIndexes([new SwappingIndex([min, i]), new ComparingIndex([])])
        this.visual.redraw();
        await Utils.sleep(this.speed);
        let tmp = series[i];
        series[i] = series[min];
        series[min] = tmp;

        this.visual.setIndexes([new SwappingIndex([])])
      }

      this.sorted_elements.push(i);
      this.visual.setIndexes([new SortedIndex(this.sorted_elements)])
      this.visual.redraw();
      await Utils.sleep(this.speed);
    }
  }

}