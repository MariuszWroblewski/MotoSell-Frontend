export interface Offer {
  id: number;
  title: string;
  description: string;
  category: string;
  brand: string;
  model: string;
  production_year: number;
  mileage: number;
  capacity: number;
  power: number;
  fuel: string;
  user: string;
  image: string;
  add_date: string;
  pub_date: string | null;
  is_pub: boolean;
}
