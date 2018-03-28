// @flow
export type FormInputs = {
  networth: string,
  savings: string,
  renter: string,
  homeowner: string,
  ror: string,
  inflation: string,
  withdrawl: string,
  price: string,
  rate: string,
  term: string,
  downpayment: string,
  houseGrowth: string,
  maintenance: string,
  propertyTax: string,
  rental: string,
  livingExpenses: string,
  tabIndex: string,
  purchaseDate: number,
  isHomeOwner: boolean,
};

export type Navigation = {|
  tabIndex: number,
|};

export type State = {|
  input: FormInputs,
  navigation: Navigation,
|};
