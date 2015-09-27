let meta = {
  networth: {
    max: 999999,
  },

  savings: {
    min: 0,
    step: 1,
  },

  goal: {
    min: 0,
    step: 1,
  },

  inflation: {
    min: -10,
    max: 20,
    step: 0.5,
  },

  ror: {
    min: 0,
    max: 20,
    step: 0.5,
  },

  withdrawl: {
    min: 0,
    max: 8,
    step: 0.5,
  },

  range: 45,
};

export default meta;
