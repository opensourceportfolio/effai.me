import $ from 'lib/jquery';
import calculator from 'service/calculator';
import i18n from 'service/i18n';
import meta from 'service/meta';

export default class Formatter {
  static currency(number) {
    if ($.isNumeric(number)) {
      let p = number.toFixed(2).split('.');

      return '$' + p[0].split('').reverse().reduce((acc, num, i) => {
        return num + (i && !(i % 3) ? ',' : '') + acc;
      }, '');
    } else {
      return '';
    }
  }

  static fiAge(status) {
    let years = calculator.calculate(status);
    let age = 0;

    if (years <= 0) {
      age = i18n.fiStatus.done;
    } else if (isNaN(years) || years > meta.range) {
      age = i18n.fiStatus.never;
    } else {
      age = i18n.fiStatus.formatter(years);
    }

    return `FI in: ${age}`;
  }
}
