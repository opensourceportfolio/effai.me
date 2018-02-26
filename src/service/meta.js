// @flow

export const meta = {
  networth: {
    min: 0,
    max: 5000000,
    step: 100,
  },

  savings: {
    min: 0,
    max: 20000,
    step: 100,
  },

  renter: {
    min: 0,
    max: 15000,
    step: 100,
  },

  homeowner: {
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

  livingExpenses: {
    min: 0,
    max: 20000,
    step: 1,
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
    purchaseDate: {
      max: Date.now(),
    },
    maintenance: {
      min: 0,
      max: 100,
      step: 0.1,
    },
    propertyTax: {
      min: 0,
      max: 100,
      step: 0.1,
    },
    rental: {
      min: 0,
      max: 10000,
      step: 1,
    },
  },

  range: 42,
};
