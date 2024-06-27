export interface Sales {
  id: number;
  month: string;
  year: string;
  productId: number;  // FK to Product
  quantity: number;
}

export interface SalesReport {
  name: string;   // Name of the month
  value: number;  // Quantity of sales
}

// The "sales" value is a formula considering the quantity that the same product was sold
// It's also considering that the same product can be sold in multiple months
// We are not considering how many available products we have