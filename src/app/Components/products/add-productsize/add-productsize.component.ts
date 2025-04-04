import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributeService } from 'src/app/Services/AttributeService/attribute.service';
import { ProductService } from 'src/app/Services/ProductService/product.service';

@Component({
  selector: 'app-add-productsize',
  templateUrl: './add-productsize.component.html',
  styleUrls: ['./add-productsize.component.css']
})
export class AddProductsizeComponent implements OnInit{
  sizeForm: FormGroup;
  colors: any[] = [];
  sizes: any[] = [];
  isEdit: boolean = false;
  productId: number = 1; // Replace with actual product ID if needed

  constructor(
    private attribute: AttributeService,
    private productService: ProductService,
    private fb: FormBuilder, private route: ActivatedRoute, private router: Router
  ) {
    // Initialize the form with a FormArray for multiple size updates
    this.sizeForm = this.fb.group({
      sizeUpdates: this.fb.array([]) // FormArray for multiple sizes
    });

    // Add the first size form group
    this.addSizeFormGroup();
  }

  ngOnInit(): void {
    this.loadColors();
    this.loadSizes();
  }

  // Getter for accessing the FormArray
  get sizeUpdates(): FormArray {
    return this.sizeForm.get('sizeUpdates') as FormArray;
  }

  // Add a new size entry to the FormArray
  addSizeFormGroup(): void {
    const sizeGroup = this.fb.group({
      colorId: ['', Validators.required],
      sizeId: ['', Validators.required],
      stockQuantity: ['', [Validators.required, Validators.min(0)]]
    });
    this.sizeUpdates.push(sizeGroup);
  }

  // Remove a size entry from the FormArray
  removeSizeFormGroup(index: number): void {
    if (this.sizeUpdates.length > 1) {
      this.sizeUpdates.removeAt(index);
    }
  }

  loadColors(): void {
    this.attribute.findColorIdsAndNames().subscribe(
      (data: any[]) => this.colors = data,
      error => console.error('Error fetching colors', error)
    );
  }

  loadSizes(): void {
    this.attribute.findSizeIdsAndNames().subscribe(
      (data: any[]) => this.sizes = data,
      error => console.error('Error fetching sizes', error)
    );
  }

  onNoClick(): void {
    this.router.navigate(['/product']);
  }

  // Method to handle form submission
  save(): void {
    if (this.sizeForm.valid) {
      const sizeUpdates = this.sizeForm.value.sizeUpdates; // Collect all the form data

      // Call the updateStockForMultipleSizes service
      this.productService.updateStockForMultipleSizes(this.productId, sizeUpdates).subscribe(
        response => {
          this.router.navigate(['/product']);
          // console.log('Stock updated successfully :', response);
        },
        error => {
          console.error('Error updating stock:', error);
        }
      );
    }
  }
}
