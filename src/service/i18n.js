let helper = {
  year(val) {
    return val;
  },

  currency(val) {
    return `$${val}`;
  },

  percent(val) {
    return `${val}%`;
  },
};

let i18n = {
  fiStatus: {
    done: 'Done',
    never: 'Never',
    formatter(val) {
      return `${val} years`;
    },
  },

  title: {
    current: 'Current state',
    prediction: 'Prediction',
  },

  link: {
    investments: 'Investments',
    prediction: 'Prediction',
    housing: 'Housing',
  },

  networth: {
    title: 'Current net worth',
    supporting: `The total value of your liquid assets that generate income including stocks, bonds and cash.
               Other assets can be included as well but remember to adjust your rate of return accordingly.`,
    chart: {
      myLabel: 'Your networth',
      goalLabel: 'Your goal',
      formatter: helper.year,
      xlabel: 'Years',
      ylabel: 'Passive income',
    },
    placeholder: 'your net worth',
    name: 'networth',
    type: 'currency',
  },

  savings: {
    title: 'Savings rate',
    supporting: `How much money do you put aside into savings and investments each month?`,
    chart: {
      formatter: helper.currency,
      xlabel: 'Savings rate',
      ylabel: 'Years to FI',
    },
    placeholder: 'your savings rate',
    name: 'savings',
    type: 'currency',
  },

  goal: {
    title: 'Your goal',
    supporting: `How much money do you need per month to be financially independent. One way to estimate this
               value is to look at your spendings today.`,
    chart: {
      formatter: helper.currency,
      xlabel: 'Goal',
      ylabel: 'Years to FI',
    },
    placeholder: 'your goal',
    name: 'goal',
    type: 'currency',
  },

  inflation: {
    title: 'Forecasted inflation',
    supporting: `What do you think inflation will look like in the future. Long term inflation over the last
              100 years or so averaged at around 3-4%`,
    chart: {
      formatter: helper.percent,
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
      formatter: helper.percent,
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
      formatter: helper.percent,
      xlabel: 'Rate of withdrawl',
      ylabel: 'Years to FI',
    },
    placeholder: 'rate of withdrawl',
    name: 'withdrawl',
    type: 'percent',
  }
};

export default i18n;
