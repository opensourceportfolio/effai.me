export const meta = {
  networth: {
    min: 0,
    max: 1000000,
    step: 100,
  },

  savings: {
    min: 0,
    max: 15000,
    step: 100,
  },

  goal: {
    min: 0,
    max: 15000,
    step: 100,
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

  house: {
    price: {
      min: 0,
      max: 5000000,
      step: 500,
    },
    rate: {
      min: 2,
      max: 8,
      step: 0.125,
    },
    term: {
      min: 0,
      max: 30,
      step: 1,
    },
    downpayment: {
      min: 0,
      max: 100,
      step: 0.25,
    },
    houseGrowth: {
      min: -20,
      max: 20,
      step: 0.5,
    },
  },

  range: 42,
};
