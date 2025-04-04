import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginatedResponseSize } from 'src/app/Models/Attributes';
import { AttributeService } from 'src/app/Services/AttributeService/attribute.service';

@Component({
  selector: 'app-attribute-size',
  templateUrl: './attribute-size.component.html',
  styleUrls: ['./attribute-size.component.css']
})
export class AttributeSizeComponent implements OnInit {
  sizes: PaginatedResponseSize | undefined;
  currentPage: number = 0;
  pageSize: number = 10;
  pageNumbers: number[] = [];
  addSizeForm: FormGroup;

  constructor(
    private attributeService: AttributeService,
    private router:Router
    // private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loadSizes();
  }

  loadSizes(page: number = 0): void {
    this.attributeService.getSizes(page, this.pageSize).subscribe(response => {
      this.sizes = response;
      this.updatePageNumbers();
    });
  }

  updatePageNumbers(): void {
    if (this.sizes) {
      this.pageNumbers = Array.from({ length: this.sizes.page.totalPages }, (_, i) => i + 1);
    }
  }

  changePage(page: number): void {
    this.currentPage = page - 1;
    this.loadSizes(this.currentPage);
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.loadSizes(this.currentPage);
    }
  }
 
  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.loadSizes(this.currentPage);
    }
  }

  hasNextPage(): boolean {
    return this.sizes ? this.currentPage < this.sizes.page.totalPages - 1 : false;
  }

  hasPreviousPage(): boolean {
    return this.sizes ? this.currentPage > 0 : false;
  }

  // openAddColorModal(): void {
  //   const modalElement = document.getElementById('addColorModal');
  //   const bootstrapModal = new bootstrap.Modal(modalElement as HTMLElement);
  //   bootstrapModal.show();
  // }

  saveSize(): void {
    this.router.navigate(['/addsize']); // Navigate to the route 
  }

}
