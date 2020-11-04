import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecordsService } from '../records.service';

export interface ConfirmDialogModel {
  id: number;
  message: string;
  title: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title align="center">
    {{data.title}}
    </h2>
    <div mat-dialog-content>
    <p>{{data.message}}</p>
    </div>
    <mat-dialog-actions align="center">
        <button mat-flat-button color="warn" (click)="onDismiss()">No</button>
        <button mat-flat-button color="primary" (click)="onConfirm()">Yes</button>
    </mat-dialog-actions>`
})

export class ConfirmDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              private readonly recordsService: RecordsService,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {}

  ngOnInit(): void {
  }

  async onConfirm(): Promise<void> {
    await this.recordsService.deleteRecord(this.data.id);
    this.dialogRef.close();
  }

  onDismiss(): void {
    this.dialogRef.close();
  }
}
