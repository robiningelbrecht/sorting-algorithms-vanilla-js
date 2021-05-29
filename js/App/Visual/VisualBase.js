export default class VisualBase {

  constructor(parent_element, series) {
    this.parent_el = parent_element;
    this.series = series;
    this.indexes = false;
    this.availableIndexTypes = [];
  }

  draw() {
    this.parent_el.className = this.constructor.name;
    this.parent_el.innerHTML = this._getSeriesContainer().outerHTML + this._getLegendContainer().outerHTML;
  }

  redraw() {
    if (!this.series) {
      return;
    }
    this.parent_el.querySelector('div.legend').innerHTML = this._getLegendContainer().innerHTML;
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

  setAvailableIndexTypes(index_types) {
    this.availableIndexTypes = index_types;
  }

  setIndexes(indexes) {
    indexes.forEach((index) => {
      this.indexes[index.getWeight()] = index;
    });
  }

  _getSeriesContainer() {
    // Child class should implement this.
  }

  _getLegendContainer() {
    let container = document.createElement('div');
    container.classList.add(...['legend', 'd-flex', 'justify-content-center']);

    this.availableIndexTypes.forEach((Index) => {
      let item = document.createElement('span');
      item.classList.add(...['badge', 'm-2', Index.getType()]);
      item.innerText = Index.getLabel();

      container.appendChild(item);
    });

    return container;
  }
}