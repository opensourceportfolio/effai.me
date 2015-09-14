export default {
  get() {
    var settings = window.localStorage.getItem('ficalculator');

    if (!settings) {
      settings = {
        networth: 50000,
        savings: 1000,
        savingsRate: 1,
        goal: 50000,
        goalRate: 2,
        ror: 8,
        inflation: 3,
        withdrawl: 4,
      };
    } else {
      settings = JSON.parse(settings);
    }

    return settings;
  },

  set(value){
    window.localStorage.setItem('ficalculator', JSON.stringify(value));
  }
};
