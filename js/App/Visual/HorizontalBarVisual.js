import Visual from "./Visual.js";

export default class HorizontalBarVisual extends Visual {

  redraw() {
    if (!this.series) {
      return;
    }

    let progress_bars = this.parent_el.querySelectorAll('.progress-horizontal .progress-bar');
    this.series.forEach((value, index) => {
      progress_bars[index].classList.remove('bg-danger');
      progress_bars[index].classList.remove('bg-warning');
      progress_bars[index].classList.remove('bg-success');
      // Update height.
      progress_bars[index].setAttribute('aria-valuenow', value);
      progress_bars[index].style.width = value + "%";
      progress_bars[index].innerText = value;
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
      progress_bar.style.width = value + "%";
      progress_bar.innerText = value;

      let progress = document.createElement('div');
      progress.classList.add(...['progress', 'progress-horizontal']);
      progress.appendChild(progress_bar);

      let col = document.createElement('div');
      col.classList.add(...['col']);
      col.appendChild(progress);

      container.appendChild(col)
    });

    return container;
  }
}