import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingService } from 'src/app/Services/ShippingService/shipping.service';
import { Shipping } from 'src/app/Models/Shipping';

@Component({
  selector: 'app-add-shipping',
  templateUrl: './add-shipping.component.html',
  styleUrls: ['./add-shipping.component.css']
})
export class AddShippingComponent implements OnInit {
  shippingForm: FormGroup;
  shippingId: number | null = null;
  shippingData: Shipping | null = null;

  constructor(
    private fb: FormBuilder,
    private shippingService: ShippingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.shippingForm = this.fb.group({
      name: ['', Validators.required],
      numberOfDay: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.shippingId = +id; // Convert string to number
        this.loadShippingData(this.shippingId);
      }
    });
  }

  loadShippingData(id: number): void {
    this.shippingService.findById(id).subscribe(
      (data: Shipping) => {
        this.shippingData = data;
        this.shippingForm.patchValue(data); // Populate form
      },
      error => console.error('Error fetching shipping data', error)
    );
  }

  onSave(): void {
    if (this.shippingForm.valid) {
      const shippingInfo = this.shippingForm.value;

      if (this.shippingId) {
        // Update existing shipping
        this.shippingService.update(this.shippingId, shippingInfo).subscribe(
          response => {
            // console.log('Shipping updated successfully', response);

            this.router.navigate(['/shipping']);
          },
          error => console.error('Error updating shipping', error)
        );
      } else {
        // Insert new shipping
        this.shippingService.insertShipping(shippingInfo).subscribe(
          response => {
            // console.log('Shipping inserted successfully', response);
            this.router.navigate(['/shipping']);
          },
          error => console.error('Error inserting shipping', error)
        );
      }
    }
  }
}
