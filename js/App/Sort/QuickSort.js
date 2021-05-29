import Utils from '../Utils.js'
import SortBase from "./SortBase.js";
import SortedIndex from "../Index/SortedIndex.js";
import ComparingIndex from "../Index/ComparingIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import PivotIndex from "../Index/PivotIndex.js";

export default class QuickSort extends SortBase {

  constructor(visual, speed) {
    super(visual, speed)

    this.sorted_elements = [];
  }

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

  async doSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;

    let pivot_index = Math.floor((left + right) / 2);
    let pivot = arr[pivot_index];

    this.visual.setIndexes([new PivotIndex([pivot_index])])
    this.visual.redraw();
    await Utils.sleep(this.speed);

    let index = await this.partition(arr, left, right, pivot);
    await this.doSort(arr, left, index - 1);
    await this.doSort(arr, index, right);

    this.sorted_elements.push(pivot_index);
    this.visual.setIndexes([new SortedIndex(this.sorted_elements)]);
    this.visual.redraw();
    await Utils.sleep(this.speed);

    return arr;
  }

  async partition(arr, left, right, pivot) {
    while (left <= right) {
      while (arr[left] < pivot && left <= right) {
        left++;
        this.visual.setIndexes([new ComparingIndex([left])])
        this.visual.redraw();
        await Utils.sleep(this.speed);
      }
      while (arr[right] > pivot) {
        this.visual.setIndexes([new ComparingIndex([left, right])])
        this.visual.redraw();
        await Utils.sleep(this.speed);
        right--;
      }
      if (left <= right) {
        this.visual.setIndexes([new ComparingIndex([left, right])])
        this.visual.redraw();
        await Utils.sleep(this.speed);

        this.visual.setIndexes([new SwappingIndex([left, right]), new ComparingIndex([])]);
        this.visual.redraw();
        await Utils.sleep(this.speed);

        [arr[left], arr[right]] = [arr[right], arr[left]];

        this.visual.setIndexes([new SwappingIndex([left, right]), new ComparingIndex([])]);
        this.visual.redraw();
        await Utils.sleep(this.speed);

        left++;
        right--;
        this.visual.setIndexes([new SwappingIndex([])]);
      }
    }
    return left;
  }

}