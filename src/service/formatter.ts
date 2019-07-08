import { NumberLike } from 'model/number-like';

export function isProperNumber(num: NumberLike | null | undefined): boolean {
  return num != null && Number(parseFloat(num)) == parseFloat(num);
}

export function formattedFloat(
  digits: number,
  number: NumberLike | null | undefined,
): string {
  const value = parseFloat(number);

  if (isProperNumber(value)) {
    const p = value.toFixed(2).split('.');
    const val = p[0]
      .split('')
      .reverse()
      .reduce((acc, num, i) => {
        return num + (i !== 0 && !(i % 3) ? ',' : '') + acc;
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

export function formattedShortFloat(digits: number, number: number): number {
  const float = formattedFloat(digits, number);

  return parseFloat(float);
}

export function formattedNumber(number: number): string {
  return formattedFloat(0, number);
}

export function longNumber(num: number | string): string {
  const value = parseFloat(num);

  if (value > 0) {
    const e = parseInt(Math.log(value) / Math.log(1000)),
      extension = ['', 'k', 'M', 'B', 'T'],
      fix = e === 0 ? 0 : 1;

    return parseFloat((value / Math.pow(1000, e)).toFixed(fix)) + extension[e];
  } else {
    return value.toString();
  }
}

export function currency(number: number | string): string {
  return `$${number}`;
}

export function formattedCurrency(number: number): string {
  const num = formattedNumber(number);

  return currency(num);
}

export function longCurrency(number: number): string {
  const num = longNumber(number);

  return currency(num);
}

export function percent(number: number): string {
  const value = parseFloat(number);

  if (isProperNumber(value)) {
    return `${value}%`;
  } else {
    return '';
  }
}
