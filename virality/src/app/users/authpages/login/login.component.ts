import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first, tap } from 'rxjs/operators';

import { AuthService } from "../../auth.service";
import { AlertService } from "../../../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private alert: AlertService,
  ) {
    // redirect to home if already logged in
    this.auth.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          this.router.navigateByUrl('/dashboard')
        }
      })
    ).subscribe()
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.auth.loginUser(this.f.username.value, this.f.password.value)
      .then(
        data => {
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          this.alert.error(error);
          this.loading = false;
        });
  }

}
