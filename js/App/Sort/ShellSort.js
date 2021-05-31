import Utils from '../Utils.js'
import SortBase from "./SortBase.js";
import ComparingIndex from "../Index/ComparingIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import SortedIndex from "../Index/SortedIndex.js";

export default class ShellSort extends SortBase {

  getTitle() {
    return 'Shell Sort';
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

    let  increment = series.length / 2;
    while (increment > 0) {
      for (let i = increment; i < series.length; i++) {
        let j = i;
        let temp = series[i];

        while (j >= increment && series[j-increment] > temp) {
          series[j] = series[j-increment];
          j = j - increment;
        }

        series[j] = temp;
      }

      if (increment === 2) {
        increment = 1;
      } else {
        increment = parseInt(increment * 5 / 11);
      }
    }

    this.visual.redraw();
  }

}