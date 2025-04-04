import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/AdminService/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ngFormLogin();
  }

  ngFormLogin() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const originalConsoleError = console.error; // Store original console.error

      console.error = () => { }; // Suppress console.error temporarily

      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (response: any) => {
          this.router.navigateByUrl("/dashboard");
        },
        (error: any) => {
          // Restore original console.error
          console.error = originalConsoleError;

          alert("Wrong email or password, please enter valid email and password.");
        }
      );
    } else {
      alert("Please fill in all fields correctly.");
    }
  }
}