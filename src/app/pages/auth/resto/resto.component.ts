import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ICity } from 'src/app/models/city';
import { IArea } from 'src/app/models/area';
import { RestoService } from '../../services/resto.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-resto',
  templateUrl: './resto.component.html',
  styleUrls: ['./resto.component.scss'],
})
export class RestoComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  hasError: boolean;
  cities: ICity[] = [];
  areas: IArea[] = [];

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _user: UserService,
    private _restuarent: RestoService,
    private router: Router,
    private _storage: StorageService
  ) {
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }

  fetchData() {
    this._user.getAllCities().subscribe((response: any) => {
      this.cities = [];
      var cities: ICity[] = response.data;
      this.cities = cities.slice();
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        name: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        city_id: [0],
        area_id: [0],
        address: [
          null,
          Validators.compose([
            Validators.required,
          ]),
        ],
      }
    );
  }

  showAreas(city) {
    var cityObj: ICity = this.cities.find((element: ICity) => element.id == city.value);
    this.areas = cityObj.areas.slice();
    console.log(this.areas);

  }

  submit() {
    this.hasError = false;
    const registrationSubscr = this._restuarent.createResto(this.registrationForm.value)
      .subscribe((response: any) => {
        this.router.navigate(['/registration']);
        this._storage.setItem('resto', response.data);
      }, error => {
        this.hasError = true;
      });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
