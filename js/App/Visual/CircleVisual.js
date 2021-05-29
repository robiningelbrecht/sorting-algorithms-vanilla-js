import VerticalBarVisual from "./VerticalBarVisual.js";

export default class CircleVisual extends VerticalBarVisual {

  redraw() {
    super.redraw();
    if (!this.series) {
      return;
    }

    let progress_bars = this.parent_el.querySelectorAll('.progress-vertical .progress-bar');

    this.series.forEach((value, index) => {
      progress_bars[index].innerText = "";
      progress_bars[index].setAttribute('data-content', value);
    });
  }

  _getSeriesContainer() {
    let container = super._getSeriesContainer();

    let progress_bars = container.querySelectorAll('.progress-vertical .progress-bar');

    this.series.forEach((value, index) => {
      progress_bars[index].innerText = "";
      progress_bars[index].setAttribute('data-content', value);
    });

    return container;
  }
}