import { Component } from '@angular/core';
import { PaginatedResponsePromoCode } from 'src/app/Models/PromoCode';
import { PromocodeService } from 'src/app/Services/PromoCodeService/promocode.service';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.css']
})
export class PromoCodeComponent {
  promoCode: PaginatedResponsePromoCode | undefined;
  currentPage: number = 0;
  pageSize: number = 10;
  pageNumbers: number[] = [];

  constructor( private promoCodeService: PromocodeService) { }

  ngOnInit(): void {
    this.loadPromoCode();
  }

  loadPromoCode(page: number = 0): void {
    this.promoCodeService.getPromoCode(page, this.pageSize).subscribe(response => {
      this.promoCode = response;
      this.updatePageNumbers();
    });
  }

  updatePageNumbers(): void {
    if (this.promoCode) {
      this.pageNumbers = Array.from({ length: this.promoCode.page.totalPages }, (_, i) => i + 1);
    }
  }

  changePage(page: number): void {
    this.currentPage = page - 1;
    this.loadPromoCode(this.currentPage);
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.loadPromoCode(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.loadPromoCode(this.currentPage);
    }
  }

  hasNextPage(): boolean {
    return this.promoCode ? this.currentPage < this.promoCode.page.totalPages - 1 : false;
  }

  hasPreviousPage(): boolean {
    return this.promoCode ? this.currentPage > 0 : false;
  }


  // loading = false;

  deletePromoCode(id: number): void {
    if (confirm('Are you sure you want to delete this promo code?')) {
      // this.loading = true;
      this.promoCodeService.deletePromoCodeById(id).subscribe({
        next: () => {
          alert('Promo code deleted successfully.');
          this.loadPromoCode(this.currentPage);
          // this.loading = false;
        },
        error: (err) => {
          alert('Error deleting promo code. It might not exist.');
          // this.loading = false;
          console.error(err);
        },
      });
    }
  }
  
}
