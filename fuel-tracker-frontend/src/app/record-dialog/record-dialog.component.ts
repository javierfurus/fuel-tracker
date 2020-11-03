import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gas } from '../lib/gas';
import { Road } from '../lib/road';
@Component({
  selector: 'app-record-dialog',
  template: `
  <h2 mat-dialog-title *ngIf="isNewRecord" align="center">Adding new record</h2>
  <h2 mat-dialog-title *ngIf="!isNewRecord" align="center">Modifying record from:</h2>
  <h2 mat-dialog-mat-dialog-title *ngIf="!isNewRecord" align="center">{{date | date: 'medium'}}</h2>
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
      <button mat-flat-button color="warn" (click)="close()">Close</button>
      <button mat-flat-button color="primary" [disabled]="!form.valid" (click)="save()">Save</button>
  </mat-dialog-actions>`,
  styles: [`  `]
})


export class RecordDialogComponent implements OnInit {
  gasTypes = Gas;
  roadTypes = Road;
  keys = Object.keys;
  id: number;
  form: FormGroup;
  date: Date;
  amountFilled: number;
  roadType: string;
  tripState: number;
  gasType: string;
  isNewRecord: boolean;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    if (!data.isNewRecord) {
      const track = data.track;
      this.id = track.id;
      this.amountFilled = track.amountFilled;
      this.roadType = track.roadType;
      this.tripState = track.tripState;
      this.date = track.date;
      this.gasType = track.gasType;
    } else {
      this.isNewRecord = data.isNewRecord;
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.id,
      amountFilled: [this.amountFilled, Validators.required],
      roadType: [this.roadType],
      tripState: [this.tripState, Validators.required],
      gasType: [this.gasType],
      date: this.date
    });
  }
  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
