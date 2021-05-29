import IndexBase from "./IndexBase.js";

export default class SwappingIndex extends IndexBase{

  getLabel() {
    return 'Swapping';
  }

  getType() {
    return 'bg-danger';
  }

  getWeight() {
    return 1;
  }
}