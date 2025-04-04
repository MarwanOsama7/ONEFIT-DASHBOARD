import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResponseShipping } from 'src/app/Models/Shipping';
import { ShippingService } from 'src/app/Services/ShippingService/shipping.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent {
  shipping: PaginatedResponseShipping | undefined;
  currentPage: number = 0;
  pageSize: number = 10;
  pageNumbers: number[] = [];

  constructor(private shippingService: ShippingService, private router: Router) { }

  ngOnInit(): void {
    this.loadShipping();
  }

  loadShipping(page: number = 0): void {
    this.shippingService.getShipping(page, this.pageSize).subscribe(response => {
      this.shipping = response;
      this.updatePageNumbers();
    });
  }

  editShipping(id: number) {
    this.router.navigate(['/addshipping', id]);
  }
  updatePageNumbers(): void {
    if (this.shipping) {
      this.pageNumbers = Array.from({ length: this.shipping.page.totalPages }, (_, i) => i + 1);
    }
  }

  changePage(page: number): void {
    this.currentPage = page - 1;
    this.loadShipping(this.currentPage);
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.loadShipping(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.loadShipping(this.currentPage);
    }
  }

  hasNextPage(): boolean {
    return this.shipping ? this.currentPage < this.shipping.page.totalPages - 1 : false;
  }

  hasPreviousPage(): boolean {
    return this.shipping ? this.currentPage > 0 : false;
  }

  toggleAllShippingFreeStatus(): void {
    this.shippingService.toggleFreeShippingForAll().subscribe(
      (updatedShippings) => {
        console.log('Shipping status updated:', updatedShippings);

        // After updating the shipping status, reload the categories (refresh the page)
        this.loadShipping(this.currentPage);
      },
      (error) => {
        console.error('Error toggling shipping status:', error);
      }
    );
  }
}
