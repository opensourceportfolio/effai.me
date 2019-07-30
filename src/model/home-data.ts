import { Percent } from 'model/percent';
export interface HomeData {
  price: number;
  downpayment: Percent;
  rate: Percent;
  purchaseDate: string;
  term: number;
  houseGrowth: Percent;
  isHomeOwner: boolean;
  maintenance: Percent;
  propertyTax: Percent;
  rental: number;
}
