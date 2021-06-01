import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApplicationDataService } from 'src/app/core/services/application-data.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  @Input() groupName!: string;
  countries$!: Observable<string[]>;
  cities$!: Observable<string[]>;

  form!: FormGroup;

  constructor(
    private applicationDataService: ApplicationDataService,
    private formGroupDirective: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.formGroupDirective.form.controls[this.groupName] as FormGroup;
    this.countries$ = this.applicationDataService.allCountries$;
    const countryChanged = this.form.controls.country.valueChanges;
    const listOfAllCitiesChanged = this.applicationDataService.allCities$;
    this.cities$ = combineLatest([countryChanged, listOfAllCitiesChanged])
      .pipe(
        tap(([countryChanged, listOfAllCitiesChanged]) => {
          const currentCity = this.form.controls.city.value;
          const currentCityItem = listOfAllCitiesChanged.find(x => x.name === currentCity)
          if (currentCityItem?.country !== countryChanged) {
            this.form.controls.city.setValue(null);
          }
        }),
        map(([seledctedCountry, allCities]) => {
          return allCities.filter(x => x.country === seledctedCountry).map(x => x.name);
        }));



  }







}
