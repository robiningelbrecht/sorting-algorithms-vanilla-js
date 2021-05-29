export default class VisualBase {

  constructor(parent_element, series) {
    this.parent_el = parent_element;
    this.series = series;
    this.indexes = false;
    this.availableIndexTypes = [];
    this.explanationTemplate = null;
  }

  async draw() {
    this.parent_el.className = this.constructor.name;

    let explanation_container = await this._getExplanationContainer();
    this.parent_el.innerHTML = this._getSeriesContainer().outerHTML + this._getLegendContainer().outerHTML + explanation_container.outerHTML;
  }

  async redrawMeta(){
    this.parent_el.querySelector('div.legend').innerHTML = this._getLegendContainer().innerHTML;
    let explanation_container = await this._getExplanationContainer();
    this.parent_el.querySelector('div.explanation').innerHTML = explanation_container.innerHTML;
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

  setExplanationTemplate(name) {
    this.explanationTemplate = name;
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

  async _getExplanationContainer() {
    let res = await fetch('/templates/' + this.explanationTemplate + '.html');

    let container = document.createElement('div');
    container.classList.add(...['explanation', 'd-flex', 'justify-content-center']);
    container.innerHTML = await res.text();

    return container;
  }
}