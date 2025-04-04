import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/ProductService/product.service';

@Component({
  selector: 'app-edit-images',
  templateUrl: './edit-images.component.html',
  styleUrls: ['./edit-images.component.css']
})
export class EditImagesComponent implements OnInit {
  images: Image[] = [];
  productId: number | null = null;
  selectedImages: File[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam !== null ? Number(idParam) : null;

    if (this.productId !== null) {
      this.loadImages(this.productId);
    }
  }

  loadImages(productId: number) {
    this.productService.findImages(productId).subscribe(
      (data: Image[]) => {
        this.images = data;
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files);
    }
  }

  updateImages(): void {
    if (this.selectedImages.length === 0) {
      this.errorMessage = 'No images selected for update.';
      return;
    }

    // Regex for "number_filename" pattern
    const regex = /^\d+_.+/;

    // Filter invalid files
    const invalidFiles = this.selectedImages.filter(file => !regex.test(file.name));

    if (invalidFiles.length > 0) {
      this.errorMessage = 'Invalid file name! Image names must follow the pattern: "number_filename" (e.g., "123_image.jpg").';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    this.productService.updateImagesProduct(this.productId!, this.selectedImages).subscribe(
      (response) => {
        this.loading = false;
        // console.log('Images updated successfully!', response);
        this.loadImages(this.productId!); // Reload images after update
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.error('Error updating images!', error);
        this.errorMessage = 'Failed to update images. Please try again.';
      }
    );
  }


  removeImage(imageId: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.loading = true;
      this.productService.deleteImageById(imageId).subscribe(
        () => {
          this.loading = false;
          console.log('Image deleted successfully!');
          this.images = this.images.filter(image => image.id !== imageId);
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          console.error('Error deleting image!', error);
        }
      );
    }
  }

  deleteAllImages(): void {
    if (confirm('Are you sure you want to delete all images for this product?')) {
      this.loading = true;
      this.productService.deleteImagesByProductId(this.productId!).subscribe(
        () => {
          this.loading = false;
          console.log('All images deleted successfully!');
          this.images = [];
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          console.error('Error deleting all images!', error);
        }
      );
    }
  }
  goBack(): void {
    this.router.navigate(['/products']); // Change this to your actual back route
  }
}
