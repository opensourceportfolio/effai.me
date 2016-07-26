import R from 'lib/ramda';

export function formattedNumber(number) {
  if (R.is(Number, number)) {
    const p = parseFloat(number).toFixed(2).split('.');
    const val = p[0].split('').reverse().reduce((acc, num, i) => {
      return num + (i && !(i % 3) ? ',' : '') + acc;
    }, '');

    return `${val}`;
  } else {
    return '';
  }
}

export function longNumber(value) {
  if (value > 0) {
    const e = parseInt(Math.log(value) / Math.log(1000)),
      extension = ['', 'k', 'M', 'B', 'T'],
      fix = e === 0 ? 0 : 1;

    return parseFloat((value / Math.pow(1000, e)).toFixed(fix)) + extension[e];
  } else {
    return value;
  }
}

export function currency(number) {
  return `$${number}`;
}

export function formattedCurrency(number) {
  const num = formattedNumber(number);

  return currency(num);
}

export function longCurrency(number) {
  const num = longNumber(number);

  return currency(num);
}

export function percent(number) {
  if (R.is(Number, number)) {
    return `${number}%`;
  } else {
    return '';
  }
}
