import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AuthService } from "../../../users/auth.service";
import { AlertService } from "../../../services/alert.service";
import { auth } from 'firebase';

@Component({
  selector: 'app-referral-master',
  templateUrl: './referral-master.component.html',
  styleUrls: ['./referral-master.component.scss']
})
export class ReferralMasterComponent implements OnInit {
  referralID = "";
  referralForm: FormGroup;
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
    this.referralID = this.route.snapshot.paramMap.get('referralID');
    this.referralForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.referralForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    this.loading = true;
    if (this.referralForm.invalid) {
      return;
    } else {
      console.log("Here");
      this.router.navigateByUrl('/register/' + this.f.email.value + '/' + this.referralID);
    }
  }

  googleSignIn() {
    this.auth.googleSignIn(this.referralID).then(data => {
      this.router.navigateByUrl('/dashboard');
    }, error => {
      this.alert.error(error);
      this.loading = false;
    })
  }

  facebookSignIn() {
    this.auth.facebookSignIn(this.referralID).then(data => {
      this.router.navigateByUrl('/dashboard');
    }, error => {
      this.alert.error(error);
      this.loading = false;
    })
  }
}
