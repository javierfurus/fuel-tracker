import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { RecordDialogComponent } from '../record-dialog/record-dialog.component';
import { RecordsService, TrackedRecord } from '../records.service';

@Component({
  selector: 'app-list-records',
  template: `
<table mat-table [dataSource]="dataSource" text-align="center" class="mat-elevation-z8">
  <ng-container matColumnDef="date">
    <th mat-header-cell *matHeaderCellDef> Date </th>
    <td mat-cell *matCellDef="let track"> {{track.date | date: 'medium'}} </td>
  </ng-container>

  <ng-container matColumnDef="trip">
    <th mat-header-cell *matHeaderCellDef> Trip </th>
    <td mat-cell *matCellDef="let track"> {{track.tripState}} </td>
  </ng-container>

  <ng-container matColumnDef="road">
    <th mat-header-cell *matHeaderCellDef> Road </th>
    <td mat-cell *matCellDef="let track"> {{track.roadType}} </td>
  </ng-container>

  <ng-container matColumnDef="gas">
    <th mat-header-cell *matHeaderCellDef> Gas </th>
    <td mat-cell *matCellDef="let track"> {{track.gasType}} </td>
  </ng-container>

  <ng-container matColumnDef="lastFill">
    <th mat-header-cell *matHeaderCellDef> Last fill </th>
    <td mat-cell *matCellDef="let track"> {{track.amountFilled}} </td>
  </ng-container>

  <ng-container matColumnDef="actions">
    <th mat-header-cell *matHeaderCellDef> Actions </th>
    <td mat-cell *matCellDef="let track">
      <button mat-raised-button color="basic" (click)="editDialog(track)" type="button">Edit</button>
      <button mat-raised-button color="warn" (click)="confirmDialog(track)" type="button">Delete</button>
    </td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
<button mat-fab class="floatingButton" (click)="createRecordDialog()">
  <mat-icon aria-hidden="false" class="float" aria-label="Add new item">add</mat-icon>
</button>
`,
  styles: [`
  .floatingButton{
    position: fixed;
      bottom: 40px;
      right: 20px;
  }
  table {
    width: 100%;
  }
  th.mat-header-cell {
  text-align: center;
  }
  td {
    text-align: center;
  }
  `]
})
export class ListRecordsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'trip', 'road', 'gas', 'lastFill', 'actions'];
  dataSource = this.recordsService.records;

  constructor(
    private dialog: MatDialog,
    public recordsService: RecordsService) { }

  ngOnInit(): void {
    this.recordsService.fetchRecords();
  }

  editDialog(record: TrackedRecord): void {
    this.dialog.open(RecordDialogComponent, {
      data: record,
      disableClose: true,
      autoFocus: true
    });
  }

  createRecordDialog(): void {
    this.dialog.open(RecordDialogComponent, {
      disableClose: true,
      autoFocus: true
    });
  }

  confirmDialog(track: TrackedRecord): void {
    this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        id: track.id,
        confirmTitle: 'Are you sure you want to delete this item?',
        message: 'Confirm action',
      }
    });
  }
}
