'use strict';

import BubbleSort from "../Sort/BubbleSort.js";
import QuickSort from "../Sort/QuickSort.js";
import SelectionSort from "../Sort/SelectionSort.js";
import InsertionSort from "../Sort/InsertionSort.js";

export default class SortFactory {

  static create(name, visual, speed) {
    if (name === 'BubbleSort') {
      return new BubbleSort(visual, speed);
    } else if (name === 'SelectionSort') {
      return new SelectionSort(visual, speed);
    } else if (name === 'InsertionSort') {
      return new InsertionSort(visual, speed);
    } else if (name === 'QuickSort') {
      return new name(visual, speed);
    }
  }

  static createFromAppState(name, state) {
    return SortFactory.create(name, state.visual, state.sort.speed)
  }

}