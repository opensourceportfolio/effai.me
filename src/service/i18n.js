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
    name: 'networth',
    type: 'currency',
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
    name: 'savings',
    type: 'currency',
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
    name: 'goal',
    type: 'currency',
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
    placeholder: 'future inflation',
    name: 'inflation',
    type: 'percent',
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
    placeholder: 'rate of return',
    name: 'ror',
    type: 'percent',
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
    placeholder: 'rate of withdrawl',
    name: 'withdrawl',
    type: 'percent',
  },

  house: {
    title: 'House price',
    supporting: 'If you were to sell the house today, how much could you sell it for?',
    chart: {
      formatter: formattedCurrency,
      xlabel: 'Price',
      ylabel: 'Year',
    },
    placeholder: 'Current Value of the house',
    name: 'house',
    type: 'currency',
  },
};
