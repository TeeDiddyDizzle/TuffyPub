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
  displayName = "";
  email = "";
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  emailValid = false;
  nameValid = false;

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
    this.registerForm = this.formBuilder.group({
      displayName: [this.displayName, Validators.required],
      email: [this.email, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  checkName() {
    var regexp = new RegExp('\w* \w*');
    this.nameValid = regexp.test(this.f.displayName.value);
    console.log(this.f.displayName.value + ": " + this.nameValid);

  }

  checkEmail() {
    var regexp = new RegExp('\w*.*@csu.fullerton.edu$');
    this.emailValid = regexp.test(this.f.email.value);
    console.log(this.f.displayName.value + ": " + this.emailValid);

  }

  onSubmit() {
    this.submitted = true;

    this.checkName();
    this.checkEmail();
    // stop here if form is invalid
    if (this.registerForm.invalid || this.emailValid == false || this.nameValid == false) {
      return;
    }

    this.loading = true;

    
    this.auth.signupUser(this.f.displayName.value, this.f.email.value, this.f.password.value)
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
