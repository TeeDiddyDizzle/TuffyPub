import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AuthService } from "../../auth.service";
import { AlertService } from "../../../services/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = "";
  referralID = "";
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
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
    this.email = this.route.snapshot.paramMap.get('email');
    this.referralID = this.route.snapshot.paramMap.get('referralID')
    this.registerForm = this.formBuilder.group({
      email: [this.email, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.referralID != "") {
      this.auth.signupUser(this.f.email.value, this.f.password.value, this.referralID)
        .then(
          data => {
            this.alert.success('Referral Registration successful, Logged In', true);
            this.router.navigateByUrl('/dashboard');
          },
          error => {
            this.alert.error(error);
            this.loading = false;
          });
    } else {
      this.auth.signupUser(this.f.email.value, this.f.password.value)
        .then(
          data => {
            this.alert.success('Registration successful, Logged In', true);
            this.router.navigateByUrl('/dashboard');
          },
          error => {
            this.alert.error(error);
            this.loading = false;
          });
    }
  }

}
