export function get() {
  const str = window.localStorage.getItem('ficalculator');
  const settings = str ? JSON.parse(str) : {};
  const defaults  = {
    networth: 50000,
    savings: 1000,
    renter: 4500,
    homeowner: 4500,
    ror: 8,
    inflation: 3,
    withdrawl: 4,
    price: 300000,
    rate: 4,
    term: 30,
    downpayment: 20,
    houseGrowth: 3,
  };

  return Object.assign(defaults, settings);
}

export function set(value) {
  window.localStorage.setItem('ficalculator', JSON.stringify(value));
}
