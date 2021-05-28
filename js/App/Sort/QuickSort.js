import Utils from '../Utils.js'
import Sort from "./Sort.js";

export default class QuickSort extends Sort{

  async run() {
    this.setSorting(true);
    let series = this.visual.series;

    await this.doSort(series, 0, series.length - 1);

    this.setSorting(false);
    this.visual.setActiveIndexes(false);
    this.visual.setBoundryIndexes(false);
    this.visual.draw();
  }

  async doSort(arr, left, right) {
    if (arr.length <= 1) {
      return arr;
    }

    this.visual.setBoundryIndexes([left, right]);
    let index = await this.partition(arr, left, right);
    if (left < (index - 1)) {
      await this.doSort(arr, left, (index - 1));
    }
    if (index < right) {
      await this.doSort(arr, index, right);
    }
  }

  async partition(arr, left, right) {
    let pivot = arr[Math.floor((right + left) / 2)],
      i = left,
      j = right;
    while (i <= j) {
      while (arr[i] < pivot) {
        i++
      }
      while (arr[j] > pivot) {
        j--;
      }
      if (i <= j) {
        await this.swap(arr, i, j);
        i++;
        j--;
      }
    }
    return i;
  }

  async swap(array, first, second) {
    this.visual.setActiveIndexes([first, second]);
    this.visual.draw();
    await Utils.sleep(this.speed / 2);

    let temp = array[first];
    array[first] = array[second];
    array[second] = temp;

    this.visual.setSeries(array);
    this.visual.draw();
    await Utils.sleep(this.speed / 2);
  }

}