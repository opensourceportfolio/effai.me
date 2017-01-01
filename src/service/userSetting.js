import idb from 'lib/idb';

const OBJECT_STORE = 'user-settings';
const dbPromise = idb.open('ficalculator-db', 1, (upgradeDB) => {
  upgradeDB.createObjectStore(OBJECT_STORE);
});

export const emptyState = {
  input: {},
  navigation: {
    tabIndex: 0,
  },
};

export const originalState  = Object.assign({}, emptyState, {
  input: {
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
    tabIndex: 0,
  },
});

export function get(key) {
  return dbPromise.then((db) => {
    const transaction = db.transaction(OBJECT_STORE);
    const store = transaction.objectStore(OBJECT_STORE);


    return store.get(key).then((settings) => {
      return Object.assign(originalState, settings);
    }).catch(() => {
      return originalState;
    });
  });
}

export function set(key, value) {
  return dbPromise.then((db) => {
    const transaction = db.transaction(OBJECT_STORE, 'readwrite');
    const store = transaction.objectStore(OBJECT_STORE);

    store.put(value, key);

    return transaction.complete;
  });
}
