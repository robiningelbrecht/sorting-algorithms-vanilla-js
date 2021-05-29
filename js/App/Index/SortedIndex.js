export default class SortedIndex {

  constructor(list) {
    this.list = list;
  }

  getLabel() {
    return 'Sorted';
  }

  getType() {
    return 'bg-success';
  }

  getList() {
    return this.list;
  }

  getWeight() {
    return 2;
  }
}