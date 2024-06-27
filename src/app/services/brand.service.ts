import { Injectable } from '@angular/core';
import { Brand } from '../interfaces/Brand';
import { brands } from '../mockups/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }

  /**
   * Get all brands, simulating a GET request to the API
   * @returns List of all brands
   */
  getBrands(): Brand[] {
    return brands;
  }
}
