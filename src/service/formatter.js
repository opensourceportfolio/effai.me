import $ from 'lib/jquery';

export default class Formatter {
  static currency(number) {
    if ($.isNumeric(number)) {
      var p = number.toFixed(2).split('.');
      return p[0].split('').reverse().reduce(function(acc, num, i) {
        return num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') + '.' + p[1];
    } else {
      return '';
    }
  }
}
