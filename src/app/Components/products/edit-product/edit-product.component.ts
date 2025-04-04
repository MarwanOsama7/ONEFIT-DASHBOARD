import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/ProductService/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  product: Product | null = null;
  slug: string | null = null;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      gender: ['', Validators.required],
      description: [''],
      metaTitle: [''],
      metaDescription: ['']
    });
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    // console.log("Slug:", this.slug);  // Debugging
    if (this.slug) {
      this.loadProduct(this.slug);
    }
  }

  loadProduct(slug: string): void {
    this.productService.findBySlug(slug).subscribe(
      (response: Product[]) => {
        // console.log("Product Data from API:", response);  // Debugging
  
        if (response.length > 0) {
          this.product = response[0];  // Extract the first product from array
          this.populateForm(this.product);
        } else {
          console.error("No product found for the given slug");
          // alert("Product not found");
        }
      },
      (error) => {
        console.error("Error loading product:", error);
        // alert("Failed to load product data");
      }
    );
  }
  
  populateForm(product: Product): void {
    this.editProductForm.patchValue({
      name: product.name,
      price: product.price,
      discount: product.discount,
      gender: product.gender,
      description: product.description,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription
    });
  }

  onSubmit(): void {
    if (this.product) {
      const updatedProduct = { ...this.product, ...this.editProductForm.value };
  
      this.productService.updateProduct(this.product.id, updatedProduct).subscribe(() => {
        // alert('Product updated successfully!');
        this.router.navigate(['/product']);
      });
    }
  }
  

}
