import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttributeService } from 'src/app/Services/AttributeService/attribute.service';

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.css']
})
export class AddSizeComponent {
  sizesForm: FormGroup;
  showSuccessAlert: boolean = false; // Controls visibility of the success alert

  constructor(
    private fb: FormBuilder,
    private colorService: AttributeService,
    private router: Router // Inject Router
  ) {
    this.sizesForm = this.fb.group({
      // attibutename: ['', Validators.required],
      attibutevalue: ['', Validators.required],
    });
  }

  onSave(): void {
    if (this.sizesForm.valid) {
      const Data = {
        // attibutename: this.sizesForm.value.attibutename,
        attibutevalue: this.sizesForm.value.attibutevalue,
      };

      this.colorService.insertSize(Data).subscribe(
        (response) => {
          // console.log('Size inserted successfully', response);

          // Show the success alert
          this.showSuccessAlert = true;

          // After 3 seconds, navigate to the specified route
          setTimeout(() => {
            this.showSuccessAlert = false;
            this.router.navigate(['/attributessize']); // Navigate to the route
          }, 3000);
        },
        (error) => {
          console.error('Error inserting Color', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.router.navigate(['/attributessize']); // Navigate to the route
  }
}
