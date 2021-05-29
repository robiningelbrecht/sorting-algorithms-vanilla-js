export default class ComparingIndex {

  constructor(list) {
    this.list = list;
  }

  getLabel() {
    return 'Comparing';
  }

  getType() {
    return 'bg-warning';
  }

  getList() {
    return this.list;
  }

  getWeight() {
    return 0;
  }
}