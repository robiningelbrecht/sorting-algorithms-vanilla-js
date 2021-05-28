export default class Visual {

  constructor(parent_element, series) {
    this.parent_el = parent_element;
    this.series = series;
    this.previousSeries = null;
    this.comparingIndexes = false;
    this.swappingIndexes = false;
    this.sortedIndexes = false
  }

  draw(legend) {
    let legend_element = document.createElement('div');
    legend_element.innerHTML = legend;

    this.parent_el.innerHTML = this._getSeriesContainer().outerHTML + legend_element.innerHTML;
  }

  redraw() {
    if (!this.series) {
      return;
    }

    let progress_bars = this.parent_el.querySelectorAll('.progress-vertical .progress-bar');
    this.series.forEach((value, index) => {
      progress_bars[index].classList.remove('bg-danger');
      progress_bars[index].classList.remove('bg-warning');
      progress_bars[index].classList.remove('bg-success');
      if (value !== this.previousSeries[index]) {
        // Update height.
        progress_bars[index].setAttribute('aria-valuenow', value);
        progress_bars[index].style.height = value + "%";
        progress_bars[index].innerText = value;
      }
      if (this.comparingIndexes !== false && this.comparingIndexes.indexOf(index) !== -1) {
        progress_bars[index].classList.add('bg-warning');
      }
      if (this.swappingIndexes !== false && this.swappingIndexes.indexOf(index) !== -1) {
        progress_bars[index].classList.add('bg-danger');
      }
      if (this.sortedIndexes !== false && this.sortedIndexes.indexOf(index) !== -1) {
        progress_bars[index].classList.add('bg-success');
      }
    });
  }

  getSeries(){
    // Make sure this variable is not returned by reference.
    return JSON.parse(JSON.stringify(this)).series
  }

  setSeries(series) {
    this.previousSeries = this.series;
    this.series = series;
  }

  setComparingIndexes(indexes){
    this.comparingIndexes = indexes;
  }

  setSwappingIndexes(indexes) {
    this.swappingIndexes = indexes;
  }

  setSortedIndexes(indexes) {
    this.sortedIndexes = indexes;
  }

  _getSeriesContainer() {
    let container = document.createElement('div');

    this.series.forEach((value, index) => {
      let progress_bar = document.createElement('div');
      progress_bar.classList.add(...['progress-bar']);
      progress_bar.setAttribute('role', 'progressbar');
      progress_bar.setAttribute('aria-valuemin', '0');
      progress_bar.setAttribute('aria-valuemax', '100');
      progress_bar.setAttribute('aria-valuenow', value);
      progress_bar.style.height = value + "%";
      progress_bar.innerText = value;

      progress_bar.classList.remove('bg-danger');
      progress_bar.classList.remove('bg-warning');
      progress_bar.classList.remove('bg-success');
      this.setSortedIndexes(false);

      let progress = document.createElement('div');
      progress.classList.add(...['progress', 'progress-vertical']);
      progress.appendChild(progress_bar);

      let col = document.createElement('div');
      col.classList.add(...['col', 'flex-grow-1']);
      col.appendChild(progress);

      container.appendChild(col)
      container.classList.add(...['row' ,'flex-nowrap'])
    });

    return container;
  }
}