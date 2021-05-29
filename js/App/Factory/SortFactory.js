import BubbleSort from "../Sort/BubbleSort.js";
import QuickSort from "../Sort/QuickSort.js";

export default class SortFactory {

  static create(name, visual, speed){
    if (name === 'bubble-sort') {
      return new BubbleSort(visual, speed);
    }else if(name === 'quick-sort'){
      return new QuickSort(visual, speed);
    }
  }

  static createFromAppState(name, state){
    return SortFactory.create(name, state.visual, state.sort.speed)
  }

}