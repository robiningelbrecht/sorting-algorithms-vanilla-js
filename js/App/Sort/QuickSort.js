import Utils from '../Utils.js'
import SortBase from "./SortBase.js";
import SortedIndex from "../Index/SortedIndex.js";
import ComparingIndex from "../Index/ComparingIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import PivotIndex from "../Index/PivotIndex.js";

export default class QuickSort extends SortBase{

  getTitle() {
    return 'Quick Sort';
  }

  getAvailableIndexTypes() {
    return [
      new SortedIndex([]),
      new ComparingIndex([]),
      new SwappingIndex([]),
      new PivotIndex([]),
    ];
  }

  async doRun() {
    let series = this.visual.series;

    await this.doSort(series, 0, series.length - 1);
  }

  async doSort(arr, left, right) {
    if (arr.length <= 1) {
      return arr;
    }

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

      this.visual.setIndexes([new ComparingIndex([i, j])])
      this.visual.redraw();
      await Utils.sleep(this.speed);

      if (i <= j) {
        await this.swap(arr, i, j);
        i++;
        j--;
      }
    }
    return i;
  }

  async swap(array, first, second) {
    let temp = array[first];
    array[first] = array[second];
    array[second] = temp;

    this.visual.setIndexes([new SwappingIndex([first, second]), new ComparingIndex([])])
    this.visual.redraw();
    await Utils.sleep(this.speed);
  }

}