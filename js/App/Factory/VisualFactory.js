import VerticalBarVisual from "../Visual/VerticalBarVisual.js";
import Utils from "../Utils.js";
import InvertedVerticalBarVisual from "../Visual/InvertedVerticalBarVisual.js";
import CircleVisual from "../Visual/CircleVisual.js";

export default class VisualFactory {

  static create(name, root, series_length) {
    if (name === 'VerticalBarVisual') {
      return new VerticalBarVisual(
        root,
        Utils.getRandomSeries(series_length)
      );
    } else if (name === 'InvertedVerticalBarVisual') {
      return new InvertedVerticalBarVisual(
        root,
        Utils.getRandomSeries(series_length)
      );
    }else if (name === 'CircleVisual') {
      return new CircleVisual(
        root,
        Utils.getRandomSeries(series_length)
      );
    }
  }
}