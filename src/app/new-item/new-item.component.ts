import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
})
export class NewItemComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewItemComponent>
  ) {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      company: [null, [Validators.required, Validators.minLength(3)]],
      ticker: [null, [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      exchange: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get company() {
    return this.formGroup.get('company');
  }

  onSubmit() {
    if (this.formGroup?.valid) {
      this.dialogRef.close(this.formGroup?.value);
    } else {
      console.log('Ignored invalid form');
    }
  }

  ngOnInit(): void {}
}
