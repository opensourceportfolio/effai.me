import { longNumber, formattedCurrency } from 'service/formatter';

export const i18n = {
  fiStatus: {
    done: 'Done',
    never: 'Never',
    formatter(val) {
      return `${parseFloat(val).toFixed(2)} years to effai`;
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
      title: 'Years to effai vs. Savings rate',
      tooltips: {
        title: (tooltip) => `Saving ${longNumber(tooltip[0].xLabel)} a month`,
        label: (tooltip) => `Expected to be be effai in ${longNumber(tooltip.yLabel)} years`,
      },
      legend: ['Years to effai'],
      formatter: formattedCurrency,
      xlabel: 'Savings rate',
      ylabel: 'Years to effai',
    },
    savings: {
      placeholder: 'Savings per month',
      additional: (v) => `${v} adjusted to inflation`,
    },
    networth: {
      placeholder: 'Total liquid assets',
      additional: (v) => `retire with ${v}`,
    },
    ror: {
      placeholder: 'Rate of return',
    },
  },

  house: {
    title: 'House price',
    supporting: 'Your housing information',
    chart: {
      title: 'Home price vs. Years',
      legend: ['Debt', 'Equity', 'Price'],
      tooltips: {
        title: (tooltip) => `Year ${longNumber(tooltip[0].xLabel)} of your mortgage`,
        label: (tooltip) => {
          if (tooltip.datasetIndex === 0) {
            return `${longNumber(tooltip.yLabel)} of debt is still left`;
          } else if (tooltip.datasetIndex === 1) {
            return `${longNumber(tooltip.yLabel)} of equity has been built up`;
          } else {
            return `The price of your house is ${longNumber(tooltip.yLabel)}`;
          }
        },
      },
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
      additional: (v) => `Home will be worth ${formattedCurrency(v)} at effai`,
    },
  },

  future: {
    title: 'Future',
    supporting: 'Your future goals',
    chart: {
      title: 'Years vs Goal',
      tooltips: {
        title: (tooltip) => `Looking for ${longNumber(tooltip[0].xLabel)} a month`,
        label: (tooltip) => `Expected to be effai in ${longNumber(tooltip.yLabel)} years`,
      },
      legend: ['Years to effai'],
      formatter: formattedCurrency,
      xlabel: 'Goal',
      ylabel: 'Years to effai',
    },
    renter: {
      placeholder: 'Goal as renter',
      additional: (v) => `${v} adjusted to inflation`,
    },
    homeowner: {
      placeholder: 'Goal as mortgage free homeowner',
      additional: (v) => `${v} adjusted to inflation`,
    },
    inflation: {
      placeholder: 'Inflation rate',
    },
    withdrawl: {
      placeholder: 'Withdrawl rate',
    },
  },

  chart: {
    title: 'Time vs Passive income',
    tooltips: {
      title: (tooltip) => `Saving for ${longNumber(tooltip[0].xLabel)} years`,
      label: (tooltip) => {
        if (tooltip.datasetIndex === 0) {
          return `Expected to require ${longNumber(tooltip.yLabel)}`;
        } else if (tooltip.datasetIndex === 1) {
          return `Expected to earn ${longNumber(tooltip.yLabel)} passively`;
        } else {
          return `The price of your house is ${longNumber(tooltip.yLabel)}`;
        }
      },
    },
    legend: ['Required income', 'Passive income'],
    formatter: formattedCurrency,
    xlabel: 'Years',
    ylabel: 'Passive income',
  },
};
