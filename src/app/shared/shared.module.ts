import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TimePickerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    CommonModule
  ],
  exports: [MatListModule, TimePickerComponent]
})
export class SharedModule { }
