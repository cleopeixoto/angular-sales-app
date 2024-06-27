import { Injectable } from '@angular/core';
import { products } from '../mockups/products';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  /**
   * Get all products, simulating a GET request to the API
   * @returns List of all products
   */
  getProducts(): Product[] {
    return products;
  }
}
