
import { openDB } from 'idb';
import { FormInputs State } from 'model/state';
import { isEmpty } from 'ramda';

const OBJECT_STORE = 'user-settings';
const dbPromise = openDB('ficalculator-db', 1, upgradeDB => {
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
    purchaseDate: '2012-12-12',
    isHomeOwner: true,
  },
  navigation: {
    tabIndex: 0,
    isShareMenuShowing: false,
  },
};

function getFromUrl(): Partial<State> {
  try {
    const params = new URLSearchParams(location.search.slice(1));
    const preconfiguredStr = params.get('values');

    return preconfiguredStr == null || isEmpty(preconfiguredStr)
      ? {}
      : JSON.parse(preconfiguredStr);
  } catch (err) {
    return {};
  }
}

export async function get(key: string): Promise<FormInputs> {
  const db = await dbPromise;
  const transaction = db.transaction(OBJECT_STORE);
  const store = transaction.objectStore(OBJECT_STORE);

  try {
    const urlSettings = getFromUrl();
    const localSettings = await store.get(key);

    const currentSettings = {
      ...originalState.input,
      ...localSettings,
      ...urlSettings,
    };

    return currentSettings;
  } catch (err) {
    return originalState.input;
  }
}

export async function set(key: string, value: FormInputs) {
  const db = await dbPromise;
  const transaction = db.transaction(OBJECT_STORE, 'readwrite');
  const store = transaction.objectStore(OBJECT_STORE);

  store.put(value, key);

  return transaction.complete;
}
