import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { PaginatedResponseProduct, Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/ProductService/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Products: PaginatedResponseProduct;
  searchValue: string = ''; // The value bound to the search input
  searchSubject: Subject<string> = new Subject(); // Subject for debouncing the search
  currentPage: number = 0;
  pageSize: number = 10;
  pageNumbers: number[] = [];

  constructor(private productService: ProductService, private router: Router) { }


  ngOnInit(): void {
    this.loadProducts();

    // Debounce the search input
    this.searchSubject.pipe(
      debounceTime(300),//wait 300ms
      distinctUntilChanged() // Only trigger if the search term has changed
    ).subscribe(searchTerm => {
      this.searchProducts(searchTerm);  // Call the search function when a valid term is entered
    });
  }

  loadProducts(page: number = 0): void {
    this.productService.getProducts(page, this.pageSize).subscribe(response => {
      this.Products = response;
      this.updatePageNumbers();
    });
  }

  // Performs the search when the search term is updated
  searchProducts(name: string): void {
    if (name.trim() === '') {
      this.loadProducts();  // If search is empty, load all products
    } else {
      this.productService.findByName(name).subscribe(response => {
        // If the search results are found, update the products
        this.Products = {
          content: response,
          page: {
            size: response.length,
            number: this.currentPage,
            totalElements: response.length,
            totalPages: 1
          }
        };
      }, error => {
        console.error('Error fetching search results:', error);
      });
    }
  }

  onSearchButtonClick(): void {
    const trimmedValue = this.searchValue.trim();
    if (trimmedValue) {
      this.searchProducts(trimmedValue); // Search for products if the input is not empty
    } else {
      this.loadProducts(); // Load all products if the input is empty
    }
  }

  onSearchChange(): void {
    const trimmedValue = this.searchValue.trim();
    if (trimmedValue === '') {
      this.loadProducts(); // Load all products when the input is cleared
    }
  }

  editProduct(slug: string) {
    this.router.navigate(['/editproduct', slug]);
  }
  
  editStock(id: number) {
    this.router.navigate(['/editstock', id]);
  }
  editImages(id: number) {
    this.router.navigate(['/editimages', id]);
  }
  
  addProductSize(id: number) {
    this.router.navigate(['/addproductsize', id]);
  }


  // Updates the pagination numbers based on the total pages
  updatePageNumbers(): void {
    if (this.Products) {
      this.pageNumbers = Array.from({ length: this.Products.page.totalPages }, (_, i) => i + 1);
    }
  }

  // Change to a specific page
  changePage(page: number): void {
    this.currentPage = page - 1;
    this.loadProducts(this.currentPage);
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.loadProducts(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.loadProducts(this.currentPage);
    }
  }

  hasNextPage(): boolean {
    return this.Products ? this.currentPage < this.Products.page.totalPages - 1 : false;
  }

  hasPreviousPage(): boolean {
    return this.Products ? this.currentPage > 0 : false;
  }

  moveToAddProduct(): void {
    this.router.navigate(['/addproduct']); // Navigate to the route
  }

}
