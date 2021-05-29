import IndexBase from "./IndexBase.js";

export default class PivotIndex extends IndexBase{

  getLabel() {
    return 'Pivot';
  }

  getType() {
    return 'bg-info';
  }

  getWeight() {
    return 1;
  }
}