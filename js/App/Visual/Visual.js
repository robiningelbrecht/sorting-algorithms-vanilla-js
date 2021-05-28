export default class Visual {

  constructor(parent_element, series) {
    this.parent_el = parent_element;
    this.series = series;
    this.indexes = false;
  }

  draw(legend) {
    let legend_element = document.createElement('div');
    legend_element.innerHTML = legend;

    this.parent_el.className = this.constructor.name;
    this.parent_el.innerHTML = this._getSeriesContainer().outerHTML + legend_element.innerHTML;
  }

  getSeries() {
    return this.series
  }

  setSeries(series) {
    this.series = series;
  }

  resetIndexes() {
    this.indexes = [];
  }

  setIndexes(indexes) {
    indexes.forEach((index) => {
      this.indexes[index.getWeight()] = index;
    });
  }

  _getSeriesContainer() {
    // Child class should implement this.
  }
}