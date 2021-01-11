import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CarRecord, CarsService } from '../cars.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { RecordDialogComponent } from '../record-dialog/record-dialog.component';
import { RecordsService, TrackedRecord, TripLeft } from '../records.service';

@Component({
  selector: 'app-list-records',
  template: `
    <mat-toolbar color="primary" class="max-width mat-elevation-z8"><mat-toolbar class="content-container" color="primary">All trips</mat-toolbar></mat-toolbar>
  <div class="container">
  <mat-toolbar color="primary">All trips</mat-toolbar>
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
      <button mat-raised-button color="basic" (click)="editDialog(track, car)" type="button">Edit</button>
      <button mat-raised-button color="warn" (click)="confirmDialog(track)" type="button">Delete</button>
    </td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
</div>
<button mat-fab class="floatingButton" (click)="createRecordDialog(car)">
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
export class ListRecordsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['date', 'trip', 'road', 'gas', 'lastFill', 'actions'];
  dataSource = this.recordsService.records;
  subscriptions: Subscription[] = [];
  tripLeft: TripLeft;
  totalTrip: Partial<TrackedRecord[]>;
  car: CarRecord;

  constructor(
    private dialog: MatDialog,
    public recordsService: RecordsService,
    public carsService: CarsService) { }

  ngOnInit(): void {
    this.recordsService.fetchRecords();
    this.recordsService.fetchTripLeft();
    this.recordsService.fetchTripRecord();
    this.carsService.fetchRecords();
    this.subscriptions.push(this.recordsService.tripLeft.subscribe((leftTrip: TripLeft) => this.tripLeft = leftTrip))
    this.subscriptions.push(this.recordsService.totalTripRecord.subscribe((trip: Partial<TrackedRecord[]>) => this.totalTrip = trip));
    this.subscriptions.push(this.carsService.records.subscribe((car: CarRecord) => {
      this.car = car;
    }));
  }

  editDialog(record: TrackedRecord, car: CarRecord): void {
    console.log(this.recordsService.fetchTripLeft());
    const dialogRef = this.dialog.open(RecordDialogComponent, {
      data: { record, car },
      disableClose: true,
      autoFocus: true
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      this.recordsService.fetchTripRecord();
      this.recordsService.fetchLatestRecords();
      this.recordsService.fetchTripLeft();
      this.carsService.fetchRecords();
    }))
  }

  createRecordDialog(car: CarRecord): void {
    const dialogRef = this.dialog.open(RecordDialogComponent, {
      data: { car },
      disableClose: true,
      autoFocus: true
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      this.recordsService.fetchTripRecord();
      this.recordsService.fetchLatestRecords();
      this.recordsService.fetchTripLeft();
      this.carsService.fetchRecords();
    }))
  }

  confirmDialog(track: TrackedRecord): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        id: track.id,
        confirmTitle: 'Are you sure you want to delete this item?',
        message: 'Confirm action',
      }
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      this.recordsService.fetchTripRecord();
      this.recordsService.fetchLatestRecords();
      this.recordsService.fetchTripLeft();
      this.carsService.fetchRecords();
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
