import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddOrderComponent } from './edit-add-order.component';

describe('EditAddOrderComponent', () => {
  let component: EditAddOrderComponent;
  let fixture: ComponentFixture<EditAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
