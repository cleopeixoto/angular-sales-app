import { Injectable } from '@angular/core';
import { sales } from '../mockups/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  sales = sales;

  constructor() { }

  getSalesReport() {
    const filteredSales: any = {};
    this.sales.forEach((saleReport) => {
      if (!filteredSales[saleReport.month]) filteredSales[saleReport.month] = saleReport.quantity;
      else filteredSales[saleReport.month] = saleReport.quantity;
    });

    // console.log('filtered sales', filteredSales);

    const result = Object.keys((filteredSales)).map((saleMonth) => {
      return {
        name: saleMonth,
        value: filteredSales[saleMonth] 
      }
    });

    // console.log('result', result);

    return result;
  }
}
