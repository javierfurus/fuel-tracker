import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarRecord } from '../cars.service';
import { Gas } from '../lib/gas';
import { Road } from '../lib/road';
import { RecordsService, TrackedRecord } from '../records.service';
export interface DashboardDialogData {
  record: TrackedRecord,
  car: CarRecord
};
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
        <p *ngIf="isNewRecord; else editedRecord" [ngStyle]="{'color':tankIsFull ? 'red' : 'warn'}">Current gas level: {{currentFuelLevel + form.controls.amountFilled.value}} L</p>
        <ng-template #editedRecord><p [ngStyle]="{'color':tankIsFull ? 'red' : 'warn'}">Current gas level: {{(currentFuelLevel - data.record.amountFilled) + form.controls.amountFilled.value}} L</p>
</ng-template>
        <p>Tank's size: {{tankSize}} L</p>
        <mat-form-field>
            <input id="amountFilled" matInput placeholder="Last fill" min=0 [max]="tankSize" type="number" formControlName="amountFilled" required>
            <mat-error *ngIf="tankIsFull; else otherError"> You cannot exceed {{tankSize}} L!</mat-error>
            <ng-template #otherError>Please pick a number between 0 and {{tankSize}}!</ng-template>
        </mat-form-field>
        <br>
        <mat-form-field>
            <input matInput placeholder="Trip state" type="number" formControlName="tripState" required>
        </mat-form-field>
        <br>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
        <button mat-flat-button color="warn" mat-dialog-close>Close</button>
        <button mat-flat-button color="primary" [disabled]="!form.valid" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [` 
  .mat-form-field {
    margin: 1em 0 1em 0;
  } `]
})

export class RecordDialogComponent implements OnInit {
  gasTypes = Gas;
  roadTypes = Road;
  keys = Object.keys;
  form: FormGroup;
  date = new Date();
  isNewRecord: boolean;
  currentFuelLevel: number;
  tankIsFull: boolean = false;
  tankSize: number;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecordDialogComponent>,
    private readonly recordsService: RecordsService,
    @Inject(MAT_DIALOG_DATA) public data: DashboardDialogData) {
  }

  ngOnInit(): void {
    this.currentFuelLevel = this.data.car.currentFuelLevel;
    this.tankSize = this.data.car.tankSize;
    this.form = new FormGroup({
      'id': new FormControl(null),
      'amountFilled': new FormControl(0, [Validators.required, this.fuelChecker.bind(this)]),
      'roadType': new FormControl(null),
      'tripState': new FormControl(null, Validators.required),
      'gasType': new FormControl(null, Validators.required),
    })

    if (this.data.record) {
      this.form.patchValue(this.data.record);
      this.isNewRecord = false;
      this.date = this.data.record.date;
    } else {
      this.isNewRecord = true;
    };
  }

  fuelChecker(formControl: FormControl) {
    if (this.isNewRecord && (formControl.value + this.currentFuelLevel) > this.tankSize) {
      this.tankIsFull = true;
      return { valid: false }
    } else if (this.isNewRecord === false && (formControl.value + (this.currentFuelLevel - this.data.record.amountFilled)) > this.tankSize) {
      this.tankIsFull = true;
      return { valid: false }
    } else {
      this.tankIsFull = false;
      return (formControl.value <= this.tankSize) ? null : { valid: false };
    }

  }

  async save(): Promise<void> {
    if (!this.data.record) {
      this.recordsService.createRecord(this.form.getRawValue(), this.dialogRef);
      return;
    }
    await this.recordsService.updateRecord(this.form.getRawValue(), this.dialogRef);
    this.dialogRef.close();
  }
}
