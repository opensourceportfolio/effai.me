export function isNumber(num) {
  return Number(parseFloat(num)) == num;
}

export function formattedFloat(digits, number) {
  const value = parseFloat(number);

  if (isNumber(value)) {
    const p = value.toFixed(2).split('.');
    const val = p[0].split('').reverse().reduce((acc, num, i) => {
      return num + (i && !(i % 3) ? ',' : '') + acc;
    }, '');
    const remainder = p[1].slice(0, digits);

    if (digits === 0) {
      return `${val}`;
    } else {
      return `${val}.${remainder}`;
    }
  } else {
    return '';
  }
}

export function formattedShortFloat(digits, number) {
  const float = formattedFloat(digits, number);

  return parseFloat(float);
}

export function formattedNumber(number) {
  return formattedFloat(0, number);
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
  const value = parseFloat(number);

  if (isNumber(value)) {
    return `${value}%`;
  } else {
    return '';
  }
}
