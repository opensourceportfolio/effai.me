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
      prediction: 'Predictions',
      target: 'Target',
      chart: 'Chart',
    },
  },

  error: {
    between: (min, max) => `You must enter a number between ${longNumber(min)} and ${longNumber(max)}`,
  },

  networth: {
    title: 'Current net worth',
    supporting: `The total value of your liquid assets that generate income including stocks, bonds and cash.
               Other assets can be included as well but remember to adjust your rate of return accordingly.`,
    chart: {
      legend: ['Total passive income', 'Your goal', 'Potential income from house'],
      xlabel: 'Years',
      ylabel: 'Passive income',
    },
    validation: '',
    placeholder: (v) => `Net worth (retire with ${v})`,
  },

  future: {
    title: 'Future',
    supporting: 'Your future goals',
    chart: {
      formatter: formattedCurrency,
      xlabel: 'Goal',
      ylabel: 'Years to FI',
    },
    goal: {
      placeholder: 'Goal',
      additional: (v) => `${v} adjusted to inflation`,
    },
    inflation: {
      placeholder: 'Inflation rate',
    },
    withdrawl: {
      placeholder: 'Withdrawl rate',
    },
  },

  financial: {
    title: 'Financials',
    supporting: 'Information about your savings and investing habits',
    chart: {
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
      legend: ['Debt', 'Equity'],
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
      additional: (v) => `Will be worth ${formattedCurrency(v)} at FI`,
    }
  },
};
