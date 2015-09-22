let meta = {
  networth: {
    type: 'currency',
    max: 999999,
  },

  savings: {
    type: 'period',
    min: 0,
    step: 1,
  },

  goal: {
    type: 'period',
    min: 0,
    step: 1,
  },

  inflation: {
    type: 'percent',
    min: -10,
    max: 20,
    step: 0.5,
  },

  ror: {
    type: 'percent',
    min: 0,
    max: 20,
    step: 0.5,
  },

  withdrawl: {
    type: 'percent',
    min: 0,
    max: 8,
    step: 0.5,
  },

  range: 45,
};

export default meta;
