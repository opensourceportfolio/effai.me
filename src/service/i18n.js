var helper = {
  year(val) {
    return 'Year ' + val;
  },

  currency(val) {
    return '$' + val;
  },

  percent(val) {
    return val + '%';
  },
};

var i18n = {
    fiStatus: {
        done: 'Done',
        never: 'Never',
        formatter: function(val) {
          return val + ' years';
        },
    },

    title: {
      current: 'Current state',
      prediction: 'Prediction',
      advanced: 'Advanced',
    },

    networth: {
        title: 'Current net worth',
        text: `The total value of your liquid assets that generate income including stocks, bonds and cash.
               Other assets can be included as well but remember to adjust your rate of return accordingly.`,
        chart: {
          myLabel: 'Your networth',
          goalLabel: 'Your goal',
          formatter: helper.year,
        },
        placeholder: 'your net worth',
        name: 'networth',
        type: 'currency',
    },

    savings: {
        title: 'Savings rate',
        text: `How much money do you put aside into savings and investments each period?`,
        chart: {
          formatter: helper.currency,
        },
        placeholder: 'your savings rate',
        name: 'savings',
        type: 'period',
    },

    goal: {
        title: 'Your goal',
        text: `How much money do you need per period to be financially independent. One way to estimate this
               value is to look at your spendings today.`,
        chart: {
          formatter: helper.currency,
        },
        placeholder: 'your goal',
        name: 'goal',
        type: 'period',
    },

    inflation: {
        title: 'Forecasted inflation',
        text: `What do you think inflation will look like in the future. Long term inflation over the last
              100 years or so averaged at around 3-4%`,
        chart: {
          formatter: helper.percent,
        },
        placeholder: 'future inflation',
        name: 'inflation',
        type: 'percent',
    },

    ror: {
        title: 'Forecasted rate of return',
        text: `What kind of return are you expecting on your savings? Are you investing in stocks or keeping
               your money safe in a bank account?`,
        chart: {
          formatter: helper.percent,
        },
        placeholder: 'rate of return',
        name: 'ror',
        type: 'percent',
    },

    withdrawl: {
        title: 'Planned rate of withdrawl',
        text: `At what rate will you be drawing down your money when you're financially independent?
               Studies show that 4% rate is a safe rate to withdraw an all stock portfolio. Bond and
               cash portfolios will probably require a lower rate.`,
        chart: {
          formatter: helper.percent,
        },
        placeholder: 'rate of withdrawl',
        name: 'withdrawl',
        type: 'percent',
    },
};
export default i18n;