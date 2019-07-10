import { concat, defaultTo, join, split, uniq } from 'ramda';

const defaultOrBlank: (input: string) => string = defaultTo<string>('');
const splitBySpace = (s: string) => split(' ', defaultOrBlank(s));
const joinWithSpace = join(' ');

export const cs = (first: string, second: string) =>
  joinWithSpace(uniq(concat(splitBySpace(first), splitBySpace(second))));
