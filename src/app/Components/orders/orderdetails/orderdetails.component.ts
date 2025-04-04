import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { order } from 'src/app/Models/Orders';
import { OrderService } from 'src/app/Services/OrderService/order.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent {
  order: order | undefined;
  @Output() statusUpdated = new EventEmitter<void>();

  constructor(private router: Router ,private service: OrderService) {
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras.state?.['orderData'];
  }

  updateStatus(id: number, status: number): void {
    this.service.updateRequestOrderStatus(id, status).subscribe({
      next: (response) => {
        alert('Status updated successfully.');
        this.statusUpdated.emit(); 
        this.router.navigateByUrl("/orders");
      },
      error: (error) => {
        console.error('Error updating status:', error); // Log the entire error object
        alert(`Failed to update status. Error: ${error.message || error.statusText}`);
      }
    });
  }
}
