import { longNumber, formattedCurrency } from 'service/formatter';

export const i18n = {
  fiStatus: {
    done: 'Done',
    never: 'Never',
    formatter(val) {
      return `${val} years`;
    },
  },

  header: {
    links: {
      known: 'Knowns',
      chart: 'Chart',
    },
  },

  error: {
    between: (min, max) => `You must enter a number between ${longNumber(min)} and ${longNumber(max)}`,
  },

  financial: {
    title: 'Financials',
    supporting: 'Information about your savings and investing habits',
    chart: {
      title: 'Years to FI vs. Savings rate',
      formatter: formattedCurrency,
      xlabel: 'Savings rate',
      ylabel: 'Years to FI',
    },
    savings: {
      placeholder: 'Savings',
      additional: (v) => `${v} adjusted to inflation`,
    },
    networth: {
      placeholder: 'Net worth',
      additional: (v) => `retire with ${v}`,
    },
    ror: {
      placeholder: 'Rate of return',
    },
  },

  house: {
    title: 'House price',
    supporting: 'If you were to sell the house today, how much could you sell it for?',
    chart: {
      title: 'Home price vs. Years',
      legend: ['Debt', 'Equity', 'Price'],
      formatter: formattedCurrency,
      xlabel: 'Year',
      ylabel: '$',
    },
    price: {
      placeholder: 'House price',
    },
    rate: {
      placeholder: 'Mortgage rate',
      additional: (v) => `${formattedCurrency(v)} per month`,
    },
    term: {
      placeholder: 'Mortgage term',
    },
    downpayment: {
      placeholder: 'Downpayment',
      additional: (v) => `${formattedCurrency(v)}`,
    },
    houseGrowth: {
      placeholder: 'Growth',
      additional: (v) => `Home will be worth ${formattedCurrency(v)} at FI`,
    }
  },

  future: {
    title: 'Future',
    supporting: 'Your future goals',
    chart: {
      title: 'Years vs Goal',
      formatter: formattedCurrency,
      xlabel: 'Goal',
      ylabel: 'Years to FI',
    },
    renter: {
      placeholder: 'Goal as renter',
      additional: (v) => `${v} adjusted to inflation`,
    },
    homeowner: {
      placeholder: 'Goal as homeowner',
      additional: (v) => `${v} adjusted to inflation`,
    },
    inflation: {
      placeholder: 'Inflation rate',
    },
    withdrawl: {
      placeholder: 'Withdrawl rate',
    },
  },
};
