import { formattedCurrency, percent } from 'service/formatter';

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
      home: 'home',
      known: 'Knowns',
      prediction: 'Predictions',
      target: 'Target',
    },
  },

  title: {
    current: 'Current state',
    prediction: 'Prediction',
    target: 'Target for the future',
    housing: 'Housing',
  },

  link: {
    investments: 'Investments',
    prediction: 'Prediction',
    housing: 'Housing',
  },

  error: {
    between: (min, max) => `You must enter a number between ${min} and ${max}`,
  },

  networth: {
    title: 'Current net worth',
    supporting: `The total value of your liquid assets that generate income including stocks, bonds and cash.
               Other assets can be included as well but remember to adjust your rate of return accordingly.`,
    chart: {
      legend: ['Your passive income', 'Your goal'],
      xlabel: 'Years',
      ylabel: 'Passive income',
    },
    validation: '',
    placeholder: (v) => `your net worth (retire with ${v})`,
  },

  savings: {
    title: 'Savings rate',
    supporting: 'How much money do you put aside into savings and investments each month?',
    chart: {
      formatter: formattedCurrency,
      xlabel: 'Savings rate',
      ylabel: 'Years to FI',
    },
    placeholder: (v) => `your savings (${v} adjusted to inflation)`,
  },

  goal: {
    title: 'Your goal',
    supporting: `How much money do you need per month to be financially independent. One way to estimate this
               value is to look at your spendings today.`,
    chart: {
      formatter: formattedCurrency,
      xlabel: 'Goal',
      ylabel: 'Years to FI',
    },
    placeholder: (v) => `your goal (${v} adjusted to inflation)`,
  },

  inflation: {
    title: 'Forecasted inflation',
    supporting: `What do you think inflation will look like in the future. Long term inflation over the last
              100 years or so averaged at around 3-4%`,
    chart: {
      formatter: percent,
      xlabel: 'Inflation',
      ylabel: 'Years to FI',
    },
    placeholder: 'Future rate of inflation',
  },

  ror: {
    title: 'Forecasted rate of return',
    supporting: `What kind of return are you expecting on your savings? Are you investing in stocks or keeping
               your money safe in a bank account?`,
    chart: {
      formatter: percent,
      xlabel: 'Rate of return',
      ylabel: 'Years to FI',
    },
    placeholder: 'Rate of return',
  },

  withdrawl: {
    title: 'Planned rate of withdrawl',
    supporting: `At what rate will you be drawing down your money when you're financially independent?
               Studies show that 4% rate is a safe rate to withdraw an all stock portfolio. Bond and
               cash portfolios will probably require a lower rate.`,
    chart: {
      formatter: percent,
      xlabel: 'Rate of withdrawl',
      ylabel: 'Years to FI',
    },
    placeholder: 'Rate of withdrawl',
  },

  house: {
    title: 'House price',
    supporting: 'If you were to sell the house today, how much could you sell it for?',
    chart: {
      formatter: formattedCurrency,
      xlabel: 'Year',
      ylabel: 'Debt',
    },
    price: {
      placeholder: 'The price of your house',
    },
    rate: {
      placeholder: (v) => `Mortgage rate (${formattedCurrency(v)})`,
    },
    term: {
      placeholder: 'Mortgage term',
    },
    downpayment: {
      placeholder: (v) => `Your downpayment (${formattedCurrency(v)})`,
    },
    houseGrowth: {
      placeholder: (v) => `Growth (Your house will be worth ${formattedCurrency(v)})`,
    }
  },
};
