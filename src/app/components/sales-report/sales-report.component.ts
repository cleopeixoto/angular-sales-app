import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatFormField, MatSelectModule } from '@angular/material/select'

import { SalesService } from '../../services/sales.service';
import { categories, products } from '../../mockups/products';
import { brands } from '../../mockups/brands';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, MatFormField, MatSelectModule, ReactiveFormsModule],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})
export class SalesReportComponent implements OnInit {
  categoryOptions = categories;
  productOptions = products;
  brandOptions = brands;

  salesForm: FormGroup = this.formBuilder.group({
    category: ['', [Validators.required]],
    productId: ['', [Validators.required]],
    brandId: ['', [Validators.required]]
  });

  data: any = [];

  constructor(
    private salesSrv: SalesService,
    private formBuilder: FormBuilder,
  ) {
    this.data = this.salesSrv.getSalesReport();
  }
  ngOnInit(): void {

    // Set form initial values
    this.salesForm.setValue({
      category: this.categoryOptions[0],
      productId: this.productOptions[0].id,
      brandId: this.brandOptions[0].id
    });

    this.updateData();
  }

  onSelect(event: any) {
    console.log(event);
  }

  updateData() {
    console.log('category', this.salesForm.controls['category'].value);
    console.log('productId', this.salesForm.controls['productId'].value);
    console.log('brandId', this.salesForm.controls['brandId'].value);
  }



}
