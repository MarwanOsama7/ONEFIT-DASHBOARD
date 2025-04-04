import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Models/Product';
import { AttributeService } from 'src/app/Services/AttributeService/attribute.service';
import { CategoryService } from 'src/app/Services/CategoryService/category.service';
import { ProductService } from 'src/app/Services/ProductService/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  categories: any[] = [];
  categoryTypes: any[] = [];
  colors: any[] = [];
  sizes: any[] = [];
  filteredCategoryTypes: any[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private attribute: AttributeService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      gender: ['', Validators.required],
      categoryId: ['', Validators.required],
      categoryTypeId: ['', Validators.required],
      productSizes: this.fb.array([]),
      colorImages: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    // this.loadCategoriesType();
    this.loadColors();
    this.loadSizes();
  }

  // Getters for form arrays
  get productSizes(): FormArray {
    return this.productForm.get('productSizes') as FormArray;
  }

  get colorImages(): FormArray {
    return this.productForm.get('colorImages') as FormArray;
  }

  getSizesFormArray(index: number): FormArray {
    return this.productSizes.at(index).get('sizes') as FormArray;
  }

  loadColors(): void {
    this.attribute.findColorIdsAndNames().subscribe(
      (data: any[]) => this.colors = data,
      (error: any) => console.error('Error fetching colors', error)
    );
  }

  loadSizes(): void {
    this.attribute.findSizeIdsAndNames().subscribe(
      (data: any[]) => this.sizes = data,
      (error: any) => console.error('Error fetching sizes', error)
    );
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategoriesWithCategoryTypes().subscribe(
      (data: any[]) => {
        this.categories = data;
        console.log('Categories Loaded:', this.categories); // Check if categories are correctly loaded
        this.loading = false;
  
        // Trigger the change event for the already selected category if any
        const selectedCategoryId = this.productForm.get('categoryId')?.value;
        if (selectedCategoryId) {
          this.onCategoryChange({ target: { value: selectedCategoryId } });
        }
      },
      error => {
        console.error('Error fetching categories', error);
        this.loading = false;
      }
    );
  }
  
  // Filter category types based on selected category
  onCategoryChange(event: any): void {
    const selectedCategoryId = event.target.value;
  
    // Find the selected category
    const selectedCategory = this.categories.find(category => category.categoryId === +selectedCategoryId);
  
    if (selectedCategory) {
      // Update filteredCategoryTypes with the categoryTypes of the selected category
      this.filteredCategoryTypes = selectedCategory.categoryTypes;
    } else {
      // If no category is found, clear the filteredCategoryTypes
      this.filteredCategoryTypes = [];
      console.log('No matching category found');
    }
  
    // Reset categoryTypeId control in the form
    this.productForm.get('categoryTypeId')?.reset();
  }
  
  
  
  // Handle form submission
  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      const formData = new FormData();

      const product = {
        name: this.productForm.get('name')?.value,
        description: this.productForm.get('description')?.value,
        gender: this.productForm.get('gender')?.value,
        price: this.productForm.get('price')?.value,
        discount: this.productForm.get('discount')?.value,
        category: { id: this.productForm.get('categoryId')?.value },
        categoryType: { id: this.productForm.get('categoryTypeId')?.value }
      };

      formData.append('product', JSON.stringify(product));

      const productSizes = this.productSizes.controls.map(sizeControl => ({
        colorId: sizeControl.get('colorId')?.value,
        sizes: sizeControl.get('sizes')?.value
      }));

      formData.append('productSizes', JSON.stringify(productSizes));

      this.colorImages.controls.forEach((control, index) => {
        const files = control.get('imageFiles')?.value;
        if (files) {
          files.forEach((file: File) => {
            formData.append('colorImages', file);
          });
        }
      });

      this.productService.addProduct(formData).subscribe(
        () => this.loading = false,
        (error: any) => {
          this.loading = false;
          console.error('Error adding product:', error);
        }
      );
    }
  }

  // Handle file input changes
  onFilesChange(event: any, index: number): void {
    const files = event.target.files;
    const formGroup = this.colorImages.at(index); // Access the specific form group

    // Initialize or retrieve the existing image files array
    const imageFiles = formGroup.get('imageFiles')?.value || [];

    // Add new files to the array
    for (let i = 0; i < files.length; i++) {
        imageFiles.push(files[i]);
    }

    // Update the form group with the new file list
    formGroup.get('imageFiles')?.setValue(imageFiles);
}

  // Add and remove product sizes
  addProductSize(): void {
    this.productSizes.push(this.fb.group({
      colorId: ['', Validators.required],
      sizes: this.fb.array([
        this.fb.group({
          sizeId: ['', Validators.required],
          stockQuantity: ['', [Validators.required, Validators.min(0)]]
        })
      ])
    }));
  }

  removeProductSize(index: number): void {
    this.productSizes.removeAt(index);
  }

  // Add and remove color images
  addColorImage(): void {
    const colorImageGroup = this.fb.group({
        imageFiles: [[]] // Array of selected image files
    });

    this.colorImages.push(colorImageGroup);
}
}
