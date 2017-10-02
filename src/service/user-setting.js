import idb from 'idb';

const OBJECT_STORE = 'user-settings';
const dbPromise = idb.open('ficalculator-db', 1, upgradeDB => {
  upgradeDB.createObjectStore(OBJECT_STORE);
});

export const emptyState = {
  input: {},
  navigation: {
    tabIndex: 0,
  },
};

export const originalState = Object.assign({}, emptyState, {
  input: {
    networth: '50000',
    savings: '1000',
    renter: '4500',
    homeowner: '4500',
    ror: '8',
    inflation: '3',
    withdrawl: '4',
    price: '300000',
    rate: '4',
    term: '30',
    downpayment: '20',
    houseGrowth: '3',
    tabIndex: '0',
    purchaseDate: Date.now(),
    isHomeOwner: true,
  },
});

export async function get(key) {
  const db = await dbPromise;
  const transaction = db.transaction(OBJECT_STORE);
  const store = transaction.objectStore(OBJECT_STORE);

  try {
    const settings = await store.get(key);

    return { ...originalState, ...settings };
  } catch (err) {
    return originalState;
  }
}

export async function set(key, value) {
  const db = await dbPromise;
  const transaction = db.transaction(OBJECT_STORE, 'readwrite');
  const store = transaction.objectStore(OBJECT_STORE);

  store.put(value, key);

  return transaction.complete;
}
