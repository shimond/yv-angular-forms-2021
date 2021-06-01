import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {

  private countriesSubject = new BehaviorSubject<string[]>([]);
  private AllHobbiesSubject = new BehaviorSubject<string[]>([]);
  private citiesSubject = new BehaviorSubject<{ name: string, country: string }[]>([]);

  get allCountries$() {
    return this.countriesSubject.asObservable();
  }

  get allCities$() {
    return this.citiesSubject.asObservable();
  }

  get allHobbies$() {
    return this.AllHobbiesSubject.asObservable();
  }
  constructor() {
    this.loadAll();
  }

  loadAll() {
    const countries: string[] = [];
    countries.push('Israel');
    countries.push('France');
    countries.push('USA');

    const hobbies: string[] = [];
    hobbies.push('Football');
    hobbies.push('Basketball');
    hobbies.push('Swiming');
    hobbies.push('Reading');
    hobbies.push('C#');

    const cities: { name: string, country: string }[] = [];
    cities.push({ name: 'Jerusalem', country: 'Israel' });
    cities.push({ name: 'Eialt', country: 'Israel' });
    cities.push({ name: 'Tel-Aviv', country: 'Israel' });
    cities.push({ name: 'Karney Shomron', country: 'Israel' });

    cities.push({ name: 'Nice', country: 'France' });
    cities.push({ name: 'Paris', country: 'France' });

    cities.push({ name: 'New York', country: 'USA' });
    cities.push({ name: 'Seattle', country: 'USA' });

    this.AllHobbiesSubject.next(hobbies);
    this.citiesSubject.next(cities);
    this.countriesSubject.next(countries);

  }
}
