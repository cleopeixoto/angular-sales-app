import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SalesService } from '../../services/sales.service';
import { categories } from '../../mockups/products';
import { brands } from '../../mockups/brands';
import { SalesReport } from '../../interfaces/SalesReport';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss',
  standalone: true,
  imports: [
    NgxChartsModule,
  ],
})
export class SalesReportComponent implements OnInit {
  products: Product[] = []

  categoryOptions = categories;
  productOptions: any = [];
  brandOptions: any = [];

  selected: any = {
    category: '', // category name
    product: '',  // product name
    brand: ''     // brand id
  }

  selectorType = {
    category: 'category',
    product: 'product',
    brand: 'brand',
  }

  data: SalesReport[] = [];

  constructor(
    private salesSrv: SalesService,
    private productSrv: ProductService,
  ) { }

  ngOnInit(): void {
    this.products = this.productSrv.getProducts();
    
    // Set initial values
    this.selected.category = this.categoryOptions[0];
    this.updateSelectors();
    this.selected.product = this.productOptions[0];
    this.updateSelectors();
    this.selected.brand = this.brandOptions[0].id;

    // Update Sales Report Data
    this.updateReportData()
  }

  /**
   * Method repsonsible to update the other selectors when one of them is changed
   */
  updateSelectors(): void {
    this.productOptions = []; // product names
    const filteredBrandIds: any = [];

    // Update product options list
    this.products.forEach((product) => {
      if (product.category === this.selected.category) {
        filteredBrandIds.push(product.brandId);

        if (!this.productOptions.includes(product.name)) this.productOptions.push(product.name);
      }
    });

    // Clear select product if it's not included into updated products
    if (!this.productOptions.includes(this.selected.product)) this.selected.product = '';


    // Update brand options list
    this.brandOptions = brands.filter((brand) => (
      filteredBrandIds.includes(brand.id)

      // Consider check if select product is included into brand's available products
      && (!this.selected.product || (this.selected.product && brand.products.includes(this.selected.product)))
    ));
    
    // Clear select brand if it's not included into updated brands
    if (!this.brandOptions.some((brand: any) => brand.id === this.selected.brand)) this.selected.brand = '';
  }

  /**
   * Method resposible to assign the new selected value to its corresponding selector
   * And, right after calling the others selectors to be updated and calling the chart data to be update
   * @param event The DOM event of updated selector
   * @param type The type of the changed selector
   */
  onSelectorChange(event: any, type: string): void {
    const value = event?.target?.value || event;

    // No changes
    if (this.selected[type] === value) return;

    this.selected[type] = type === this.selectorType.brand ? Number(value) : value;
    this.updateSelectors();

    this.updateReportData();
  }

  /**
   * Method to update chart data
   */
  updateReportData(): void {
    this.data = this.salesSrv.getSalesReport(this.selected.category, this.selected.product, Number(this.selected.brand));
  }
}
