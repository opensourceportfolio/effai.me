import {
  longNumber,
  formattedCurrency,
  formattedFloat,
} from 'service/formatter';

export const i18n = {
  fiStatus: {
    done: 'Done',
    never: 'Never',
    formatter(val) {
      return `${parseFloat(val).toFixed(2)} years to Effai`;
    },
  },

  header: {
    links: {
      known: 'Knowns',
      chart: 'Chart',
    },
  },

  error: {
    between: (min, max) =>
      `Enter a number between ${longNumber(min)} and ${longNumber(max)}`,
  },

  financial: {
    title: 'Financials',
    supporting: 'Information about your savings and investing habits',
    chart: {
      title: 'Years to Effai vs. Savings rate',
      tooltips: {
        title: tooltip => `Saving ${longNumber(tooltip[0].xLabel)} a month`,
        label: tooltip =>
          `Effai date will be different by ${formattedFloat(
            1,
            tooltip.yLabel,
          )} years`,
      },
      legend: ['Years to Effai'],
      formatter: formattedCurrency,
      xlabel: 'Savings rate',
      ylabel: 'Years to Effai',
    },
    savings: {
      placeholder: 'Savings per month',
      additional: v => `${v} after inflation`,
    },
    networth: {
      placeholder: 'Total liquid assets',
      additional: v => `retire with ${v}`,
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
        title: tooltip =>
          `Year ${longNumber(tooltip[0].xLabel)} of your mortgage`,
        label: tooltip => {
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
      additional: v => `${formattedCurrency(v)} per month`,
    },
    term: {
      placeholder: 'Mortgage term',
    },
    downpayment: {
      placeholder: 'Downpayment',
      additional: v => `${formattedCurrency(v)}`,
    },
    houseGrowth: {
      placeholder: 'Growth',
      additional: v => `${formattedCurrency(v)} at Effai`,
    },
    purchaseDate: {
      placeholder: 'Purchase date',
    },
    maintenance: {
      placeholder: 'Annual maintenance',
      additional: v => `${formattedCurrency(v)} per year`,
    },
    propertyTax: {
      placeholder: 'Annual property tax',
      additional: v => `${formattedCurrency(v)} per year`,
    },
    rental: {
      placeholder: 'Estimated rental cost',
      additional: v => `${formattedCurrency(v)} after inflation`,
    },
  },

  future: {
    title: 'Future',
    supporting: 'Your future goals',
    chart: {
      title: 'Years vs Goal',
      tooltips: {
        title: tooltip =>
          `Looking for ${longNumber(tooltip[0].xLabel)} a month`,
        label: tooltip =>
          `Effai date will be different by ${formattedFloat(
            1,
            tooltip.yLabel,
          )} years`,
      },
      legend: ['Years to Effai'],
      formatter: formattedCurrency,
      xlabel: 'Goal',
      ylabel: 'Years to Effai',
    },
    livingExpenses: {
      placeholder: 'Living expenses',
      additional: v => `${v} after inflation`,
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
      title: tooltip => `Saving for ${longNumber(tooltip[0].xLabel)} years`,
      label: tooltip => {
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
