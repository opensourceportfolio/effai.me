import $ from 'lib/jquery';

export function formattedNumber(number) {
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

export function longNumber(value) {
  if (value > 0) {
    let e = parseInt(Math.log(value) / Math.log(1000)),
      extension = ['', 'k', 'M', 'B', 'T'],
      fix = e !== 0 ? 1 : 0;

    return (value / Math.pow(1000, e)).toFixed(fix) + extension[e];
  } else {
    return value;
  }
}

export function currency(number) {
  return `$${number}`;
}

export function formattedCurrency(number) {
  let num = formattedNumber(number);

  return currency(num);
}

export function longCurrency(number) {
  let num = longNumber(number);

  return currency(num);
}

export function percent(number) {
  if ($.isNumeric(number)) {
    return `${number}%`;
  } else {
    return '';
  }
}
