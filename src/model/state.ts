export interface FormInputs {
  networth: string;
  savings: string;
  renter: string;
  homeowner: string;
  ror: string;
  inflation: string;
  withdrawl: string;
  price: string;
  rate: string;
  term: string;
  downpayment: string;
  houseGrowth: string;
  maintenance: string;
  propertyTax: string;
  rental: string;
  livingExpenses: string;
  tabIndex: string;
  purchaseDate: string;
  isHomeOwner: boolean;
}

export interface Navigation {
  tabIndex: number;
  isShareMenuShowing: boolean;
}

export interface State {
  input: FormInputs;
  navigation: Navigation;
}
