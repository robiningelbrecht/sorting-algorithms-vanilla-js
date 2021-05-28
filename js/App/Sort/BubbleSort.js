import Utils from '../Utils.js'
import Sort from "./Sort.js";
import ComparingIndex from "../Index/ComparingIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import SortedIndex from "../Index/CompletedIndex.js";

export default class BubbleSort extends Sort {

  getTitle() {
    return 'Bubble Sort';
  }

  getLegend(){
    return '<div class="d-flex justify-content-center">\n' +
      '        <span class="badge bg-success m-2">Sorted</span>\n' +
      '        <span class="badge bg-warning m-2">Comparing</span>\n' +
      '        <span class="badge bg-danger m-2">Swapping</span>\n' +
      '    </div>';
  }

  async doRun() {
    let series = this.visual.getSeries();
    let len = series.length;

    let swapped;
    let count_sorted = 0;
    do {
      swapped = false;
      for (let i = 0; i < len; i++) {
        this.visual.setIndexes([new ComparingIndex([i, i + 1])])
        this.visual.redraw();
        await Utils.sleep(this.speed);

        if (series[i] > series[i + 1]) {
          let tmp = series[i];
          this.visual.setIndexes([new SwappingIndex([i, i + 1]), new ComparingIndex([])])

          series[i] = series[i + 1];
          series[i + 1] = tmp;
          swapped = true;

          this.visual.setSeries(series);
          this.visual.redraw();
          this.visual.setIndexes([new SwappingIndex([])])

          await Utils.sleep(this.speed);
        }
      }

      count_sorted++
      let sorted = [];
      for (let j = 1; j <= count_sorted; j++) {
        sorted.push(len - j);
      }

      this.visual.setIndexes([new SortedIndex(sorted)]);
    } while (swapped);
  }

}