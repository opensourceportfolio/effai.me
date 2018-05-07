// @flow
import idb from 'idb';
import { type State } from 'model/state';

const OBJECT_STORE = 'user-settings';
const dbPromise = idb.open('ficalculator-db', 1, upgradeDB => {
  upgradeDB.createObjectStore(OBJECT_STORE);
});

export const originalState: State = {
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
    maintenance: '1',
    propertyTax: '0.5',
    rental: '1500',
    livingExpenses: '4000',
    tabIndex: '0',
    purchaseDate: Date.now(),
    isHomeOwner: true,
  },
  navigation: {
    tabIndex: 0,
    isShareMenuShowing: false,
  },
};

export async function get(key: string) {
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

export async function set(key: string, value: string) {
  const db = await dbPromise;
  const transaction = db.transaction(OBJECT_STORE, 'readwrite');
  const store = transaction.objectStore(OBJECT_STORE);

  store.put(value, key);

  return transaction.complete;
}
