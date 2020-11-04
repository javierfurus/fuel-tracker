import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gas } from '../lib/gas';
import { Road } from '../lib/road';
import { RecordsService, TrackedRecord } from '../records.service';

@Component({
  selector: 'app-record-dialog',
  template: `
    <h2 mat-dialog-title *ngIf="isNewRecord; else notNew" align="center">Adding new record</h2>
    <ng-template #notNew>
      <h2 mat-dialog-title align="center">Modifying record from:</h2>
      <h2 mat-dialog-mat-dialog-title align="center">{{ date | date: 'medium'}}</h2>
    </ng-template>
    <mat-dialog-content align="center" [formGroup]="form">
      <mat-form-field>
      <mat-label>Road type</mat-label>
      <mat-select formControlName="roadType" required>
        <mat-option *ngFor="let road of keys(roadTypes)" [value]="roadTypes[road]" >
          {{road}}
        </mat-option>
      </mat-select>
    </mat-form-field>
      <br>
    <mat-form-field>
    <mat-label>Gas type</mat-label>
    <mat-select formControlName="gasType" required>
      <mat-option *ngFor="let gas of keys(gasTypes)" [value]="gasTypes[gas]">
        {{gasTypes[gas]}}
      </mat-option>
    </mat-select>
    </mat-form-field>
        <br>
        <mat-form-field>
            <input matInput placeholder="Amount filled" type="number" formControlName="amountFilled" required>
        </mat-form-field>
        <br>
        <mat-form-field>
            <input matInput placeholder="Trip state" type="number" formControlName="tripState" required>
        </mat-form-field>
        <br>
        <!-- <mat-form-field>
            <input matInput [ngxMatDatetimePicker]="picker" placeholder="Fill time" formControlName="date">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <ngx-mat-datetime-picker #picker [startAt]="date"></ngx-mat-datetime-picker>
        </mat-form-field> -->
    </mat-dialog-content>
    <mat-dialog-actions align="center">
        <button mat-flat-button color="warn" mat-dialog-close>Close</button>
        <button mat-flat-button color="primary" [disabled]="!form.valid" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`  `]
})


export class RecordDialogComponent implements OnInit {
  gasTypes = Gas;
  roadTypes = Road;
  keys = Object.keys;
  form: FormGroup;
  date = new Date();
  isNewRecord: boolean;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<RecordDialogComponent>,
              private readonly reportService: RecordsService,
              @Inject(MAT_DIALOG_DATA) public data: TrackedRecord) {
    this.form = this.fb.group({
      id: null,
      amountFilled: [null, Validators.required],
      roadType: null,
      tripState: [null, Validators.required],
      gasType: [null],
      date: this.date
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  async save(): Promise<void> {
    if (!this.data) {
      this.reportService.createRecord(this.form.getRawValue(), this.dialogRef);
      return;
    }
    await this.reportService.updateRecord(this.form.getRawValue());
    this.dialogRef.close();
  }
}
