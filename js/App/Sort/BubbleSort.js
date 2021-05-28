import Utils from '../Utils.js'
import Sort from "./Sort.js";

export default class BubbleSort extends Sort {

  async run() {
    this.setSorting(true);

    let series = this.visual.getSeries();
    let len = series.length;

    let swapped;
    let count_sorted = 0;
    do {
      swapped = false;
      for (let i = 0; i < len; i++) {
        series = this.visual.getSeries();
        this.visual.setComparingIndexes([i, i + 1]);
        this.visual.redraw();
        await Utils.sleep(this.speed);

        if (series[i] > series[i + 1]) {
          let tmp = series[i];
          this.visual.setSwappingIndexes([i, i + 1]);
          this.visual.setComparingIndexes(false);

          series[i] = series[i + 1];
          series[i + 1] = tmp;
          swapped = true;

          this.visual.setSeries(series);
          this.visual.redraw();
          this.visual.setSwappingIndexes(false);

          await Utils.sleep(this.speed);
        }
      }

      count_sorted++
      let sorted = [];
      for(let j = 1; j <= count_sorted; j++){
        sorted.push(len - j);
      }
      this.visual.setSortedIndexes(sorted);
    } while (swapped);

    this.visual.setComparingIndexes(false);
    this.visual.setSwappingIndexes(false);
    this.visual.setSortedIndexes(this.visual.getSeries().map(function(_, i) { return i }));
    this.visual.redraw();
    this.setSorting(false);
  }

}