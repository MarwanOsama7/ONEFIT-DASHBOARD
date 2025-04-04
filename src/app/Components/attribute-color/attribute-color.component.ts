import { Component, OnInit } from '@angular/core';
import { AttributeService } from 'src/app/Services/AttributeService/attribute.service';
import { PaginatedResponseColors } from 'src/app/Models/Attributes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare const bootstrap: any;

@Component({
  selector: 'app-attribute-color',
  templateUrl: './attribute-color.component.html',
  styleUrls: ['./attribute-color.component.css']
})
export class AttributeColorComponent implements OnInit {
  colors: PaginatedResponseColors | undefined;
  currentPage: number = 0;
  pageSize: number = 10;
  pageNumbers: number[] = [];
  addColorForm: FormGroup;

  constructor(
    private attributeService: AttributeService,
    private router:Router,
    private fb: FormBuilder
  ) {
    // Initialize the form group
    this.addColorForm = this.fb.group({
      attibutename: ['', Validators.required],
      attibutevalue: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadColors();
  }

  loadColors(page: number = 0): void {
    this.attributeService.getColors(page, this.pageSize).subscribe(response => {
      this.colors = response;
      this.updatePageNumbers();
    });
  }

  updatePageNumbers(): void {
    if (this.colors) {
      this.pageNumbers = Array.from({ length: this.colors.page.totalPages }, (_, i) => i + 1);
    }
  }

  changePage(page: number): void {
    this.currentPage = page - 1;
    this.loadColors(this.currentPage);
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.loadColors(this.currentPage);
    }
  }
 
  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.loadColors(this.currentPage);
    }
  }

  hasNextPage(): boolean {
    return this.colors ? this.currentPage < this.colors.page.totalPages - 1 : false;
  }

  hasPreviousPage(): boolean {
    return this.colors ? this.currentPage > 0 : false;
  }

  // openAddColorModal(): void {
  //   const modalElement = document.getElementById('addColorModal');
  //   const bootstrapModal = new bootstrap.Modal(modalElement as HTMLElement);
  //   bootstrapModal.show();
  // }

  saveColor(): void {
    this.router.navigate(['/addcolor']); // Navigate to the route
  }

}
