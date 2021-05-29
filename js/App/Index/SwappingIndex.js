export default class SwappingIndex {

  constructor(list) {
    this.list = list;
  }

  getLabel() {
    return 'Swapping';
  }

  getType() {
    return 'bg-danger';
  }

  getList() {
    return this.list;
  }

  getWeight() {
    return 1;
  }
}