import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttributeService } from 'src/app/Services/AttributeService/attribute.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent {
  colorsForm: FormGroup;
  showSuccessAlert: boolean = false; // Controls visibility of the success alert

  constructor(
    private fb: FormBuilder,
    private colorService: AttributeService,
    private router: Router // Inject Router
  ) {
    this.colorsForm = this.fb.group({
      attibutename: ['', Validators.required],
      attibutevalue: ['', Validators.required],
    });
  }

  onSave(): void {
    if (this.colorsForm.valid) {
      const categoryData = {
        attibutename: this.colorsForm.value.attibutename,
        attibutevalue: this.colorsForm.value.attibutevalue,
      };

      this.colorService.insertColor(categoryData).subscribe(
        (response) => {
          console.log('Color inserted successfully', response);

          // Show the success alert
          this.showSuccessAlert = true;

          // After 3 seconds, navigate to the specified route
          setTimeout(() => {
            this.showSuccessAlert = false;
            this.router.navigate(['/attributescolor']); // Navigate to the route
          }, 3000);
        },
        (error) => {
          console.error('Error inserting Color', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.router.navigate(['/attributescolor']); // Navigate to the route
  }
}
