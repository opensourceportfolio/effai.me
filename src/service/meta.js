var meta = {
  networth: {
    type: 'currency'
  },

  savings: {
    type: 'period',
    min: 0,
    step: 1
  },

  goal: {
    type: 'period',
    min: 0,
    step: 1
  },

  inflation: {
    type: 'percent',
    min: -10,
    step: 0.5
  },

  ror: {
    type: 'percent',
    min: 0,
    step: 0.5
  },

  withdrawl: {
    type: 'percent',
    min: 0,
    step: 0.5
  },

  range: 30
};

export default meta;
