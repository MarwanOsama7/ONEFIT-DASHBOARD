import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromocodeService } from 'src/app/Services/PromoCodeService/promocode.service';
import { PromoCode } from 'src/app/Models/PromoCode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-promocode',
  templateUrl: './add-promocode.component.html',
  styleUrls: ['./add-promocode.component.css']
})
export class AddPromocodeComponent {
  promoCodeForm: FormGroup;
  isEdit: boolean = false;

  @Output() promoCodeAdded = new EventEmitter<PromoCode>();

  constructor(private fb: FormBuilder, private promoCodeService: PromocodeService, private route: Router) {
    this.promoCodeForm = this.fb.group({
      promoCode: ['', [Validators.required, Validators.minLength(3)]],
      promoDiscount: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      usageLimit: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSave(): void {
    if (this.promoCodeForm.valid) {
      const promoData = this.promoCodeForm.value;

      this.promoCodeService.insertPromoCode(promoData).subscribe(
        response => {
          // console.log('Promo code inserted successfully', response);
          this.promoCodeAdded.emit(response);
          this.promoCodeForm.reset(); // Reset form after saving
          this.route.navigateByUrl("/promocode")

        },
        error => {
          console.error('Error inserting promo code', error);
        }
      );
    }
  }
}
