export function get() {
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

  return Object.assign(defaults, settings);
}

export function set(value) {
  window.localStorage.setItem('ficalculator', JSON.stringify(value));
}
