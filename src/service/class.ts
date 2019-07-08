import { compose, concat, defaultTo, join, split, uniq } from 'ramda';

const toList = compose(
  split(' '),
  defaultTo(''),
);
const joinUnique = compose(
  join(' '),
  uniq,
);

export const cs = (first: string, second: string) =>
  joinUnique(concat(toList(first), toList(second)));
