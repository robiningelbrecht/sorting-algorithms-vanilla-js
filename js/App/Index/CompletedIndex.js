export default class CompletedIndex {

  constructor(list) {
    this.list = list;
  }

  getType(){
    return 'bg-success';
  }

  getList(){
    return this.list;
  }
}