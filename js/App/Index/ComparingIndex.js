import IndexBase from "./IndexBase.js";

export default class ComparingIndex extends IndexBase{

  getLabel() {
    return 'Comparing';
  }

  getType() {
    return 'bg-warning';
  }

  getWeight() {
    return 10;
  }
}