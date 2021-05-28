import Utils from '../Utils.js'
import Sort from "./Sort.js";

export default class QuickSort extends Sort{

  getTitle() {
    return 'Bubble Sort';
  }

  getLegend(){
    return '<div class="d-flex justify-content-center">\n' +
      '        <span class="badge bg-success m-2">Sorted</span>\n' +
      '        <span class="badge bg-warning m-2">Comparing</span>\n' +
      '        <span class="badge bg-danger m-2">Swapping</span>\n' +
      '        <span class="badge bg-info m-2">Pivot</span>\n' +
      '    </div>';
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

    this.visual.setSortedIndexes([Math.floor((right + left) / 2)]);
    this.visual.redraw();
    await Utils.sleep(this.speed);

    while (i <= j) {
      while (arr[i] < pivot) {
        i++
      }
      while (arr[j] > pivot) {
        j--;
      }
      this.visual.setComparingIndexes([i, j]);
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

    this.visual.setSwappingIndexes([first, second]);
    this.visual.redraw();
    await Utils.sleep(this.speed);
  }

}