import IndexBase from "./IndexBase.js";

export default class SortedIndex extends IndexBase{

  getLabel() {
    return 'Sorted';
  }

  getType() {
    return 'bg-success';
  }

  getWeight() {
    return 2;
  }
}