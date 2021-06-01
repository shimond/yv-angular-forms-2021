import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApplicationDataService } from 'src/app/core/services/application-data.service';
import { OrdersApiService } from 'src/app/core/services/orders-api.service';

@Component({
  templateUrl: './edit-add-order.component.html',
  styleUrls: ['./edit-add-order.component.scss']
})
export class EditAddOrderComponent implements OnInit {

  orderFormGroup!: FormGroup;
  hobbies$!: Observable<string[]>;

  get orderItemGroups() {
    const formArray = this.orderFormGroup.controls.orderItems as FormArray;
    return formArray.controls.map(x => x as FormGroup);
  }

  get orderItemArray() {
    const formArray = this.orderFormGroup.controls.orderItems as FormArray;
    return formArray;
  }

  private validAtLeast2(f: FormControl) {
    const selectedItems = f.value as string[];
    if (selectedItems.length < 2) {
      return { validAtLeast2: false }
    }
    return undefined;
  }

  private validTimeBefore22(f: FormControl) {
    let d = f.value as Date;
    if (d) {
      const hour = d.getHours();
      if (hour >= 22) {
        return { validTimeBefore22: false };
      }
    }
    return null;

  }

  constructor(
    private formBuilder: FormBuilder,
    private orderApiService: OrdersApiService,
    private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {

    this.hobbies$ = this.applicationDataService.allHobbies$;
    this.orderFormGroup = this.formBuilder.group({
      id: [],
      comment: ['ENTER YOUR COMMENT HERE'],
      comment2: [{ value: null, disabled: true }],
      orderItems: this.formBuilder.array([]),
      shippingAddress: this.getAddressGroup(),
      hobbies: [[], [this.validAtLeast2]],
      orderDate: [null, [this.validTimeBefore22]]

    });

    this.orderFormGroup.controls.comment.valueChanges.subscribe((value: string) => {
      if (value.length > 10) {
        this.orderFormGroup.controls.comment2.enable();
      }
      else {
        this.orderFormGroup.controls.comment2.disable();
      }
    });

    this.orderApiService.getOrderById(1).subscribe(order => {
      for (const item of order.orderItems) {
        this.orderItemArray.push(this.createOrderItemGroup());
      }
      this.orderFormGroup.patchValue(order);
    });

  }

  private getAddressGroup() {
    return this.formBuilder.group({
      city: [],
      country: []
    });
  }

  private createOrderItemGroup() {
    return this.formBuilder.group({
      id: [],
      productId: [],
      amount: []
    });
  }

  addOrderItem() {
    this.orderItemArray.push(this.createOrderItemGroup());
  }

  removeItem(index: number) {
    this.orderItemArray.removeAt(index);
  }
}




  // Core module - services - > import only on appModule
  // Shared module - UI - Components, directives, pipes import...
