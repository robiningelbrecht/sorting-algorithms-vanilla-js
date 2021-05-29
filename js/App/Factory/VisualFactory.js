import VerticalBarVisual from "../Visual/VerticalBarVisual.js";
import Utils from "../Utils.js";
import InvertedVerticalBarVisual from "../Visual/InvertedVerticalBarVisual.js";

export default class VisualFactory {

  static create(name, root, series_length) {
    if (name === 'vertical-bars') {
      return new VerticalBarVisual(
        root,
        Utils.getRandomSeries(series_length)
      );
    } else if (name === 'inverted-vertical-bars') {
      return new InvertedVerticalBarVisual(
        root,
        Utils.getRandomSeries(series_length)
      );
    }
  }
}