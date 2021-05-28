export default class SwappingIndex {

  constructor(list) {
    this.list = list;
  }

  getType(){
    return 'bg-danger';
  }

  getList(){
    return this.list;
  }

  getWeight(){
    return 1;
  }
}