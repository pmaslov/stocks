import { StockItem } from './../model/StockItem';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { NewItemComponent } from './new-item.component';

describe('NewItemComponent', () => {
  let component: NewItemComponent;
  let fixture: ComponentFixture<NewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewItemComponent],
      providers: [FormBuilder, { provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'populated form is valid',
    <any>fakeAsync(() => {
      const testStock = new StockItem('MICROSOFT', 'MSFT', 100, 'NASDAQ', true);
      component.formGroup.controls['company'].setValue(testStock.company);
      component.formGroup.controls['ticker'].setValue(testStock.ticker);
      component.formGroup.controls['price'].setValue(testStock.price);
      component.formGroup.controls['exchange'].setValue(testStock.exchange);
      expect(component.formGroup.valid).toEqual(true);
    })
  );
});
