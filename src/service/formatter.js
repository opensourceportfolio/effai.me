import $ from 'lib/jquery';
import i18n from 'service/i18n';
import meta from 'service/meta';

export default class Formatter {
  static currency(number) {
    if ($.isNumeric(number)) {
      let p = parseFloat(number).toFixed(2).split('.');
      let val = p[0].split('').reverse().reduce((acc, num, i) => {
        return num + (i && !(i % 3) ? ',' : '') + acc;
      }, '');

      return `$${val}`;
    } else {
      return '';
    }
  }

  static percent(number) {
    if ($.isNumeric(number)) {
      return `${number}%`;
    } else {
      return '';
    }
  }

  static fiAge(years) {
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
