import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CarRecord, CarsService } from '../cars.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RecordDialogComponent } from '../record-dialog/record-dialog.component';
import { RecordsService, TrackedRecord, TripLeft } from '../records.service';

@Component({
  selector: 'app-dashboard',
  template: `
  <mat-toolbar color="primary" class="max-width mat-elevation-z8">
    <mat-toolbar class="content-container" color="primary">Dashboard</mat-toolbar>
  </mat-toolbar>
  <mat-card class="container" style="display:flex; justify-content: space-around">
    <div *ngIf="car" #containerRef style="width:35%;">
      <p style="text-align: center; font-size:'1.5em'; font-weight:'bold'">Tank Level</p>
      <ngx-charts-gauge [view]="[containerRef.offsetWidth, 350]" [scheme]="colorScheme" [results]="single"
        [legend]=false [max]="car.tankSize" [units]="units">
        (activate)="onActivate($event)" (deactivate)="onDeactivate($event)">
      </ngx-charts-gauge>
    </div>
    <div style="display:flex; flex-direction:column;">
      <p style="text-align: center; font-size:'1.5em'; font-weight:'bold'">Details</p>
      <div style="display:flex; flex-direction:column; margin:auto;">
        <div *ngIf='tripLeft && tripLeft.roadType !== "No trip"; else noTrip' style="padding-bottom: 0;">
          <p *ngIf='car'>Total trip: {{car.tripState}} Km</p>
          <p *ngIf='tripLeft.tripLeft > 0; else noTripLeft'>Trip left: ~{{tripLeft.tripLeft}} Km if you continue on
            {{tripLeft.roadType}}</p>
          <ng-template #noTripLeft>
            <p>You ran out of fuel! Refill now!</p>
          </ng-template>
        </div>
        <ng-template #noTrip>
          <p>You have no logged trips</p>
        </ng-template>
        <p *ngIf='car'>You are driving a {{car.name}}, your current fuel level is {{car.currentFuelLevel}}
          L/{{car.tankSize}} L</p>
        <div *ngIf='car && car.fuelPercent < 40 && !noTrip' style="display:flex; align-items: center">
          <p style="margin-bottom: 0;">Your car's tank is less than 40%. You should consider refilling it.</p>
          <mat-icon style="color:orange">warning</mat-icon>
        </div>
      </div>
    </div>
  </mat-card>
  <div class="container">
    <mat-toolbar color="primary">Latest trips</mat-toolbar>
    <table mat-table [dataSource]="dataSource" text-align="center" class="mat-elevation-z8">
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef> Date </th>
        <td mat-cell *matCellDef="let track"> {{track.date | date: 'medium'}} </td>
      </ng-container>

      <ng-container matColumnDef="trip">
        <th mat-header-cell *matHeaderCellDef> Last Trip </th>
        <td mat-cell *matCellDef="let track"> {{track.tripState}} </td>
      </ng-container>

      <ng-container matColumnDef="road">
        <th mat-header-cell *matHeaderCellDef> Road </th>
        <td mat-cell *matCellDef="let track"> {{track.roadType}} </td>
      </ng-container>

      <ng-container matColumnDef="gas">
        <th mat-header-cell *matHeaderCellDef> Gas Type </th>
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
          <button mat-raised-button color="warn" (click)="confirmDialog(track, car)" type="button">Delete</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>
  <button mat-fab class="floatingButton" (click)="createRecordDialog(car)">
    <mat-icon aria-hidden="false" class="float" aria-label="Add new item">add</mat-icon>
  </button>`,
  styles: [`
  /deep/ ngx-charts-gauge /deep/ .ng-star-inserted:nth-of-type(2) {
    display: none;
  }

  /deep/ ngx-charts-gauge /deep/ tspan:first-of-type {
    display: none;
  }

  /deep/ ngx-charts-gauge /deep/ tspan:nth-of-type(2) {
    font-size: 2rem;
    transform: translate(100px, 100px);
  }

  .floatingButton {
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
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['date', 'trip', 'road', 'gas', 'lastFill', 'actions'];
  dataSource = this.recordsService.latestRecords;
  totalTrip: Partial<TrackedRecord[]>;
  tripLeft: TripLeft;
  subscriptions: Subscription[] = [];
  car: CarRecord;
  single: any[] = [];
  legend: boolean = true;
  legendPosition: string = "below";
  units: string;
  colorScheme = {
    domain: ["#5AA454"]
  };
  constructor(
    private dialog: MatDialog,
    public recordsService: RecordsService,
    public carsService: CarsService) { }

  ngOnInit(): void {
    this.recordsService.fetchTripLeft();
    this.recordsService.fetchLatestRecords();
    this.recordsService.fetchTripRecord();
    this.carsService.fetchRecords();
    this.subscriptions.push(this.recordsService.tripLeft.subscribe((leftTrip: TripLeft) => this.tripLeft = leftTrip))
    this.subscriptions.push(this.recordsService.totalTripRecord.subscribe((trip: Partial<TrackedRecord[]>) => this.totalTrip = trip));
    this.subscriptions.push(this.carsService.records.subscribe((car: CarRecord) => {
      this.car = car;
      this.units = `Fuel ${this.car.fuelPercent.toString()}%`;
      this.fillStatistics();
    }));

  }

  fillStatistics(): void {
    this.single = [];
    this.single.push(
      {
        name: "Tank Level (in L)",
        value: this.car.currentFuelLevel
      },
      {
        name: "Tank Size",
        value: this.car.tankSize
      }
    );
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
      this.fillStatistics();
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
      this.fillStatistics();
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
      this.fillStatistics();
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
