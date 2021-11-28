import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _user: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _storage: StorageService
  ) {
    // this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this._user.loginUser(this.loginForm.value)
      .subscribe((response) => {
        this._user.setLocalStorageUser(response.data);
        this._user.setToken(response.data.token);
        this._storage.setItem('resto', response.data.restaurant);
        if (response.data.is_Admin) {
          this.router.navigate(['/resto']);
        }
        else
          this.router.navigate(['/dashboard/product']);
      }, error => {
        if (error.status == 430) {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
