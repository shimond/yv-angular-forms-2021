import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: TimePickerComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePickerComponent implements OnInit, ControlValueAccessor, Validator {

  timeGroup!: FormGroup;
  hours: number[] = [];
  minutes: number[] = [];
  registerOnChangeFunction: any;
  dateValue!: Date;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.timeGroup = this.formBuilder.group({
      hour: [],
      minutes: [null, [Validators.max(30)]]
    });

    this.timeGroup.valueChanges.subscribe(formValue => {
      this.dateValue.setMinutes(formValue.minutes);
      this.dateValue.setHours(formValue.hour);
      if (this.registerOnChangeFunction) {
        this.registerOnChangeFunction(this.dateValue);
      }
    });

    for (let index = 0; index <= 23; index++) {
      this.hours.push(index);
    }
    for (let index = 0; index <= 59; index += 15) {
      this.minutes.push(index);
    }
  }

  writeValue(obj: any): void {
    this.dateValue = new Date(obj);
    this.timeGroup.patchValue({
      hour: this.dateValue.getHours(),
      minutes: this.dateValue.getMinutes()
    });
  }

  registerOnChange(fn: any): void {
    this.registerOnChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.timeGroup.disable();
    }
    else {
      this.timeGroup.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.timeGroup.valid) {
      return null;
    }
    return this.timeGroup.controls.minutes.errors;
  }

}
