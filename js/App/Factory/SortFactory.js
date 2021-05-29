import BubbleSort from "../Sort/BubbleSort.js";

export default class SortFactory {

  static create(name, visual, speed){
    if (name === 'bubble-sort') {
      return new BubbleSort(visual, speed);
    }
  }

}