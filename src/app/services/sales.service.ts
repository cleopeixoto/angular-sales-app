import { Injectable } from '@angular/core';
import { sales } from '../mockups/sales';
import { ProductService } from './product.service';
import { Sales } from '../interfaces/SalesReport';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  sales: Sales[] = [];

  constructor(
    private productSrv: ProductService,
  ) {
    this.sales = this.getSales();
  }

  /**
   * Get all sales, simulating a GET request to the API
   * @returns List of all sales
   */
  getSales() {
    return sales;
  }

  /**
   * Get Sales Report
   * For a better performance, all the sales filter should be done on backend
   * @param category 
   * @param productName 
   * @param brandId 
   * @returns 
   */
  getSalesReport(category: string, productName: string, brandId: number) {
    const products = this.productSrv.getProducts();

    // Filter products with given params
    const productIds: number[] = []
    products.forEach((product) => {
      if (product.category === category && product.name === productName && product.brandId === brandId) productIds.push(product.id);
    });

    // Get sales report with filtered products
    const filteredSales: any = {};
    this.sales.forEach((saleReport) => {
      if (!productIds.includes(saleReport.productId)) return;

      if (!filteredSales[saleReport.month]) filteredSales[saleReport.month] = saleReport.quantity;
      else filteredSales[saleReport.month] = saleReport.quantity;
    });

    // Adapt dict structure to be shown on the chart
    return Object.keys((filteredSales)).map((saleMonth) => {
      return {
        name: saleMonth,
        value: filteredSales[saleMonth]
      }
    });
  }
}
