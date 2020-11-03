import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { RecordDialogComponent } from '../record-dialog/record-dialog.component';
import { RecordsService, TrackedRecord } from '../records.service';
@Component({
  selector: 'app-list-records',
  template: `
<table mat-table [dataSource]="dataSource" align="center" class="mat-elevation-z8">
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
<button mat-fab class="floatingButton" (click)="creatRecordDialog()">
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
  }`]
})
export class ListRecordsComponent implements OnInit {
  title = 'list-records';
  tracks: TrackedRecord[];
  result = '';
  interval: any;
  deletedRow: string;
  dataSource: MatTableDataSource<TrackedRecord>;
  displayedColumns: string[] = ['date', 'trip', 'road', 'gas', 'lastFill', 'actions'];
  constructor(
    private dialog: MatDialog,
    public recordsService: RecordsService,) { }

  editDialog(track): void {
    const editDialogConfig = new MatDialogConfig();

    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;

    editDialogConfig.data = {
      track
    };

    const dialogRef = this.dialog.open(RecordDialogComponent, editDialogConfig);

    dialogRef.afterClosed().subscribe(
      record => this.recordsService.onUpdateRecord(record)
    );
  }
  creatRecordDialog(): void {
    const createRecordDialogConfig = new MatDialogConfig();
    const isNewRecord = true;

    createRecordDialogConfig.disableClose = true;
    createRecordDialogConfig.autoFocus = true;
    createRecordDialogConfig.data = {
      isNewRecord
    };
    const dialogRef = this.dialog.open(RecordDialogComponent, createRecordDialogConfig);

    dialogRef.afterClosed().subscribe(
      record => this.recordsService.onCreateRecord(record)
    );
  }
  confirmDialog(track): void {
    const message = `Are you sure you want to delete this item?`;
    const confirmTitle = 'Confirm action';

    const dialogData = new ConfirmDialogModel(confirmTitle, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.recordsService.onDeleteRecord(track);
      }
    });


  }
  ngOnInit(): void {
    this.fillRows();
    this.interval = setInterval(() => {
      this.fillRows();
    }, 3000);
  }
  fillRows(): void {
    this.recordsService.fetchRecords().subscribe(res => {
      this.tracks = res;
      this.dataSource = new MatTableDataSource(this.tracks);
    });
  }
}
