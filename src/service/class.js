import { compose, concat, defaultTo, join, split, uniq } from 'ramda';

const toList = compose(split(' '), defaultTo(''));
const joinUnique = compose(join(' '), uniq);

export const cs = (first, second) =>
  joinUnique(concat(toList(first), toList(second)));
