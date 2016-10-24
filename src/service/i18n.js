import { formattedCurrency } from 'service/formatter';

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
    between: (min, max) => `You must enter a number between ${formattedCurrency(min)} and ${formattedCurrency(max)}`,
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
      placeholder: (v) => `Goal (${v} adjusted to inflation)`,
    },
    inflation: {
      placeholder: 'Expected rate of inflation',
    },
    withdrawl: {
      placeholder: 'Rate of withdrawl',
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
      placeholder: (v) => `Savings (${v} adjusted to inflation)`,
    },
    networth: {
      placeholder: (v) => `Net worth (retire with ${v})`,
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
      placeholder: 'Price of your house',
    },
    rate: {
      placeholder: (v) => `Mortgage rate (${formattedCurrency(v)})`,
    },
    term: {
      placeholder: 'Mortgage term',
    },
    downpayment: {
      placeholder: (v) => `Downpayment (${formattedCurrency(v)})`,
    },
    houseGrowth: {
      placeholder: (v) => `Growth (Your house will be worth ${formattedCurrency(v)})`,
    }
  },
};
