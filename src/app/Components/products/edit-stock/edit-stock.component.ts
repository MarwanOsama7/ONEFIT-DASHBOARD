import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSizes } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/ProductService/product.service';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {
  productSizeForm: FormGroup;
  id: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private productService: ProductService) {
    this.productSizeForm = this.fb.group({
      sizes: this.fb.array([]) // FormArray to hold dynamic sizes
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam !== null ? Number(idParam) : null;

    if (this.id !== null) {
      this.loadProductSizes(this.id);
    }
  }

  get sizes(): FormArray {
    return this.productSizeForm.get('sizes') as FormArray;
  }

  loadProductSizes(productId: number): void {
    this.productService.findProductSizeByProductId(productId).subscribe((data) => {
      this.sizes.clear(); // Clear existing form data
      data.forEach(size => {
        const group = this.fb.group({
          sizeId: [size.sizeId],
          sizeValue: [{ value: size.sizeValue, disabled: true }], // Disable field here
          stockQuantity: [size.stockQuantity],
          colorId: [size.colorId],
          colorValue: [{ value: size.colorValue, disabled: true }] // Disable field here
        });
        this.sizes.push(group);
      });
    });
  }

  onSave(): void {
    if (this.productSizeForm.valid && this.id !== null) {  // Ensure id is not null
      const sizeUpdates = this.productSizeForm.value.sizes.map((size: any) => ({
        sizeId: size.sizeId,
        colorId: size.colorId,
        stockQuantity: size.stockQuantity
      }));

      this.productService.updateStockForMultipleSizes(this.id, sizeUpdates).subscribe(
        (response: any) => {
          // console.log('Stock updated successfully', response);
          this.router.navigate(['/product']);
        },
        (error: any) => {
          console.error('Error updating stock:', error);
        }
      );
    } else {
      console.error("Error: Product ID is null.");
    }
  }

}
