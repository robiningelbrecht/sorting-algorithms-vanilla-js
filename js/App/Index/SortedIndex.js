export default class SortedIndex {

  constructor(list) {
    this.list = list;
  }

  getType(){
    return 'bg-success';
  }

  getList(){
    return this.list;
  }

  getWeight(){
    return 2;
  }
}