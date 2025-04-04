import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginatedResponse } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/Services/CategoryService/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any;
  categoryForm: FormGroup;
  selectedCategory: any;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      categorytype: this.fb.array([]) // Array to hold dynamic category types
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  get categoryTypes(): FormArray {
    return this.categoryForm.get('categorytype') as FormArray;
  }

  addCategoryType(): void {
    this.categoryTypes.push(this.fb.control('', Validators.required));
  }

  removeCategoryType(index: number): void {
    this.categoryTypes.removeAt(index);
  }

  openAddCategoryModal(): void {
    const modalElement = document.getElementById('addCategoryModal');
    if (modalElement) {
      modalElement?.removeAttribute('inert');
      const bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  }

  submitCategoryForm(): void {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);  // Log the form value for debugging
      this.categoryService.insertCategory(this.categoryForm.value).subscribe(() => {
        this.loadCategories();  // Reload categories after successful submission

        // Re-initialize the modal before attempting to hide it
        const modalElement = document.getElementById('addCategoryModal');
        if (modalElement) {
          const bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
          bootstrapModal.hide();  // Hide the modal after success
        }

        // Optional: Reset the form after submission
        this.categoryForm.reset();
        this.categoryTypes.clear(); // Clear the dynamic category types
      });
    }
  }


}
