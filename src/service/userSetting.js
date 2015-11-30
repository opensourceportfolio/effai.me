import $ from 'lib/jquery';

export default {
  get() {
    let settings = window.localStorage.getItem('ficalculator');
    let defaults  = {
      networth: 50000,
      savings: 1000,
      goal: 4500,
      ror: 8,
      inflation: 3,
      withdrawl: 4,
      housePrice: 300000,
    };

    if (!settings) {
      settings = {};
    } else {
      settings = JSON.parse(settings);
    }

    return $.extend(settings, defaults);
  },

  set(value) {
    window.localStorage.setItem('ficalculator', JSON.stringify(value));
  }
};
