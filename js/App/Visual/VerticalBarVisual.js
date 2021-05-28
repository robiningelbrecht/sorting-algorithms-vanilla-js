import Visual from "./Visual.js";
import CompletedIndex from "../Index/CompletedIndex.js";
import SwappingIndex from "../Index/SwappingIndex.js";
import ComparingIndex from "../Index/ComparingIndex.js";

export default class VerticalBarVisual extends Visual {

  constructor(parent_element, series) {
    super(parent_element, series);
    this.availableIndexTypes = [
      new CompletedIndex([]),
      new SwappingIndex([]),
      new ComparingIndex([])
    ];
  }

  redraw() {
    if (!this.series) {
      return;
    }

    let progress_bars = this.parent_el.querySelectorAll('.progress-vertical .progress-bar');
    this.series.forEach((value, index) => {
      // Update height.
      progress_bars[index].setAttribute('aria-valuenow', value);
      progress_bars[index].style.height = value + "%";
      progress_bars[index].innerText = value;

      // Remove classes.
      this.availableIndexTypes.forEach((Index) => {
        progress_bars[index].classList.remove(Index.getType());
      });

      // Add classes to active indexes.
      this.indexes.forEach((Index) => {
        if(Index.getList().indexOf(index) !== -1){
          progress_bars[index].classList.add(Index.getType());
        }
      });
    });
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

      this.availableIndexTypes.forEach((Index) => {
        progress_bar.classList.remove(Index.getType());
      });

      let progress = document.createElement('div');
      progress.classList.add(...['progress', 'progress-vertical']);
      progress.appendChild(progress_bar);

      let col = document.createElement('div');
      col.classList.add(...['col', 'flex-grow-1']);
      col.appendChild(progress);

      container.appendChild(col)
      container.classList.add(...['row', 'flex-nowrap'])
    });

    return container;
  }
}