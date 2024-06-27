import { Product } from "./Product";

// Each brand has multiple products, in which have different categories
// E.g.: "name": "Volkswagen"
export interface Brand {
  id: number;
  name: string;
  abbreviation: string;
}