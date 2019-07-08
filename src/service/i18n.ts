// @flow

import { TooltipItem TooltipItems } from 'model/chart';
import {
  formattedCurrency,
  formattedFloat,
  longNumber,
} from 'service/formatter';

export const i18n = {
  fiStatus: {
    done: 'Done',
    never: 'Never',
    formatter(val: number) {
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
    between: (min: number, max: number) =>
      `Enter a number between ${longNumber(min)} and ${longNumber(max)}`,
  },

  financial: {
    title: 'Financials',
    supporting: 'Information about your savings and investing habits',
    chart: {
      title: 'Years to Effai vs. Savings rate',
      tooltips: {
        title: (tooltip: TooltipItems) => {
          return `Saving ${tooltip[0].xLabel} a month`;
        },
        label: (tooltip: TooltipItem) => {
          return `Effai date will be different by ${formattedFloat(
            1,
            tooltip.yLabel,
          )} years`;
        },
      },
      legend: ['Years to Effai according to your savings'],
      formatter: formattedCurrency,
      xlabel: 'Savings rate',
      ylabel: 'Years to Effai',
    },
    savings: {
      placeholder: 'Savings per month',
      additional: (v: string) => `${v} after inflation`,
    },
    networth: {
      placeholder: 'Total liquid assets',
      additional: (v: string) => `retire with ${v}`,
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
        title: (tooltip: TooltipItems) =>
          `Year ${longNumber(tooltip[0].xLabel)} of your mortgage`,
        label: (tooltip: TooltipItem) => {
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
      additional: (v: number) => `${formattedCurrency(v)} per month`,
    },
    term: {
      placeholder: 'Mortgage term',
    },
    downpayment: {
      placeholder: 'Downpayment',
      additional: (v: number) => `${formattedCurrency(v)}`,
    },
    houseGrowth: {
      placeholder: 'Growth',
      additional: (v: number) => `${formattedCurrency(v)} at Effai`,
    },
    purchaseDate: {
      placeholder: 'Purchase date',
    },
    maintenance: {
      placeholder: 'Annual maintenance',
      additional: (v: number) => `${formattedCurrency(v)} per year`,
    },
    propertyTax: {
      placeholder: 'Annual property tax',
      additional: (v: number) => `${formattedCurrency(v)} per year`,
    },
    rental: {
      placeholder: 'Equivalent/current rental cost',
      additional: (v: number) => `${formattedCurrency(v)} after inflation`,
    },
  },

  future: {
    title: 'Future',
    supporting: 'Your future goals',
    chart: {
      title: 'Years vs Goal',
      tooltips: {
        title: (tooltip: TooltipItems) =>
          `Looking for ${tooltip[0].xLabel} a month`,
        label: (tooltip: TooltipItem) =>
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
      placeholder: 'Living expenses (not including rent or mortgage)',
      additional: (v: string) => `${v} after inflation`,
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
      title: (tooltip: TooltipItems) =>
        `Saving for ${longNumber(tooltip[0].xLabel)} years`,
      label: (tooltip: TooltipItem) => {
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
