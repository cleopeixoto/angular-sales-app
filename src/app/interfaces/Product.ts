// Each product is bind to a specific Category
// E.g.: "name": "Car"
export interface Product {
  id: number;
  name: string;
  category: string;
  brandId: number;  // Foreign key to Brand
}