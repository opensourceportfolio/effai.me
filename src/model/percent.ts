import { Opaque } from './opaque';

export type Percent = Opaque<number, 'Percent'>;

export function Percent(num: number | string): Percent {
  return parseFloat(num.toString()) as Percent;
}
