import $ from 'lib/jquery';

export default class Formatter {

  static formattedNumber(number) {
    if ($.isNumeric(number)) {
      let p = parseFloat(number).toFixed(2).split('.');
      let val = p[0].split('').reverse().reduce((acc, num, i) => {
        return num + (i && !(i % 3) ? ',' : '') + acc;
      }, '');

      return `${val}`;
    } else {
      return '';
    }
  }

  static longNumber(value) {
    if (value > 0) {
      let e = parseInt(Math.log(value) / Math.log(1000)),
        extension = ['', 'k', 'M', 'B', 'T'],
        fix = e !== 0  ? 1 : 0;

      return (value / Math.pow(1000, e)).toFixed(fix) + extension[e];
    } else {
      return value;
    }
  }

  static currency(number) {
    return `$${number}`;
  }

  static formattedCurrency(number) {
    let num = Formatter.formattedNumber(number);

    return Formatter.currency(num);
  }

  static longCurrency(number) {
    let num = Formatter.longNumber(number);

    return Formatter.currency(num);
  }

  static percent(number) {
    if ($.isNumeric(number)) {
      return `${number}%`;
    } else {
      return '';
    }
  }

}
