import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { order, PaginatedResponseOrder } from 'src/app/Models/Orders';
import { OrderService } from 'src/app/Services/OrderService/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: PaginatedResponseOrder | undefined;
  currentPage: number = 0;
  pageSize: number = 10;
  pageNumbers: number[] = [];
  descriptionState: Map<number, boolean> = new Map();
  searchValue: string = ''; // The value bound to the search input
  searchSubject: Subject<string> = new Subject(); // Subject for debouncing the search


  constructor(private orderService: OrderService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const path = segments.map(segment => segment.path).join('/');
      if (path === 'orders') {
        this.loadOrders();
      } else if (path === 'completedorders') {
        this.loadCompletedOrders();
      }
    });

    // Debounce the search input
    this.searchSubject.pipe(
      debounceTime(300),  // Wait 300ms after the last keystroke
      distinctUntilChanged() // Only trigger if the search term has changed
    ).subscribe(searchTerm => {
      this.searchOrder(searchTerm);  // Call the search function when a valid term is entered
    });
  }

  loadCompletedOrders(page: number = 0): void {
    this.orderService.getOrdersByStatusCompleteReturn(page, this.pageSize).subscribe(response => {
      this.orders = response;
      this.updatePageNumbers();
    });
  }

  loadOrders(page: number = 0): void {
    this.orderService.getOrders(page, this.pageSize).subscribe(response => {
      this.orders = response;
      this.updatePageNumbers();
    });
  }

  showOrderDetails(order: order): void {
    this.router.navigate(['/order-details'], { state: { orderData: order } });
  }

  onSearchButtonClick(): void {
    const trimmedValue = this.searchValue.trim();
    if (trimmedValue) {
      this.searchOrder(trimmedValue); // Search for products if the input is not empty
    } else {
      this.loadOrders(); // Load all products if the input is empty
    }
  }

  onSearchChange(): void {
    const trimmedValue = this.searchValue.trim();
    if (trimmedValue === '') {
      this.loadOrders(); // Load all products when the input is cleared
    }
  }
  updatePageNumbers(): void {
    if (this.orders) {
      this.pageNumbers = Array.from({ length: this.orders.page.totalPages }, (_, i) => i + 1);
    }
  }

  changePage(page: number): void {
    this.currentPage = page - 1;
    this.loadOrders(this.currentPage);
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.loadOrders(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.loadOrders(this.currentPage);
    }
  }

  hasNextPage(): boolean {
    return this.orders ? this.currentPage < this.orders.page.totalPages - 1 : false;
  }

  hasPreviousPage(): boolean {
    return this.orders ? this.currentPage > 0 : false;
  }

  // showItems(id: number, items: any[]): void {
  //   const dialogRef = this.dialog.open(ShowItemsDialogComponent, {
  //     width: '600px',
  //     data: { id, items },
  //     disableClose: true // Prevent closing the dialog by clicking outside
  //   });

  //   dialogRef.componentInstance.statusUpdated.subscribe(() => {
  //     this.loadOrders(this.currentPage); // Refresh orders
  //   });
  // }


  // Triggered when the search input changes
  // onSearchChange(searchTerm: string): void {
  //   this.searchSubject.next(searchTerm);  // Emit the new search term to the subject
  // }
  // loading = false;

  deleteOrderById(id: number): void {
    if (confirm('Are you sure you want to delete this Order?')) {
      this.orderService.deleteOrderById(id).subscribe({
        next: () => {
          alert('Order deleted successfully.');
          // Filter out the deleted order from the orders list
          if (this.orders) {
            const updatedContent = this.orders.content.filter(order => order.id !== id);
            // Create a new PaginatedResponseOrder to maintain the structure
            this.orders = {
              content: updatedContent,
              page: this.orders.page // Keeping the pagination data the same
            };
          }
          this.loadOrders(this.currentPage); // Refresh orders to reflect deletion
        },
        error: (err: any) => {
          alert('Error deleting Order. It might not exist.');
          console.error(err);
        },
      });
    }
  }

  // Performs the search when the search term is updated
  searchOrder(name: string): void {
    if (name.trim() === '') {
      this.loadOrders();  // If search is empty, load all products
    } else {
      this.orderService.findByCodeAndPhoneNumber(name).subscribe(response => {
        // If the search results are found, update the products
        this.orders = {
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
}
