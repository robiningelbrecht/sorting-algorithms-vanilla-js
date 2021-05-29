export default class Utils {

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static getRandomSeries(length) {
    let series = [];
    let max = 100;
    let min = 10;

    while (series.length < length) {
      let value = Math.floor(Math.random() * (max - min + 1) + min);
      if (series.indexOf(value) === -1) series.push(value);
    }

    return series
  }

  static range(start, stop, step) {
    return Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  }
}