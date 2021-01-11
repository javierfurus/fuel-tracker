import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { RecordDialogComponent } from './record-dialog/record-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
const API_URL = environment.FUEL_TRACKER_API;

export interface TrackedRecord {
  id: number;
  date: Date;
  tripState: number;
  roadType: string;
  gasType: string;
  amountFilled: number;
}
export interface TripLeft {
  tripLeft: number,
  roadType: string;
}
@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  records: BehaviorSubject<TrackedRecord[]> = new BehaviorSubject<TrackedRecord[]>([]);
  latestRecords: BehaviorSubject<TrackedRecord[]> = new BehaviorSubject<TrackedRecord[]>([]);
  totalTripRecord = new Subject<Partial<TrackedRecord[]>>();
  tripLeft = new Subject<TripLeft>();

  constructor(private http: HttpClient,
    private readonly snackBar: MatSnackBar) { }

  async deleteRecord(id: number): Promise<void> {
    try {
      await this.http.delete(`${API_URL}/track/${id}`, { responseType: 'text' }).toPromise();
    } catch (e) {
      this.snackBar.open('Error' + e, 'OK');
    }
    this.snackBar.open('Record Deleted', 'OK');
    return;
  }

  public async updateRecord(trackRow: TrackedRecord, ref: MatDialogRef<RecordDialogComponent>): Promise<void> {
    try {
      await this.http.put(`${API_URL}/track/${trackRow.id}`, trackRow).toPromise();
    } catch (e) {
      this.snackBar.open('Error' + e, 'OK');
    }
    this.snackBar.open('Record Updated', 'OK');
    ref.close();
    return;
  }

  public createRecord(newRecord: TrackedRecord, ref: MatDialogRef<RecordDialogComponent>): void {
    this.http.post(`${API_URL}/track`, newRecord, { responseType: 'text' }).subscribe(() => {
      this.snackBar.open('Record Created', 'OK');
      ref.close();
    }, error => this.snackBar.open('Error' + JSON.stringify(error), 'OK'));
  }

  public fetchTripRecord(): void {
    this.http.get(`${API_URL}/track/totalTrip`).subscribe((totalTrip: Partial<TrackedRecord[]>) => {
      this.totalTripRecord.next(totalTrip)
    }, error => this.snackBar.open('Error' + JSON.stringify(error), 'OK'));
  }

  public fetchRecords(): void {
    this.http.get<TrackedRecord[]>(`${API_URL}/track`).subscribe((data) => {
      this.records.next(data);
    }, error => this.snackBar.open('Error' + JSON.stringify(error), 'OK'));
  }

  public fetchTripLeft(): void {
    this.http.get(`${API_URL}/track/tripLeft`).subscribe((tripLeft: TripLeft) => {
      this.tripLeft.next(tripLeft);
    }, error => this.snackBar.open('Error' + JSON.stringify(error), 'OK'));
  }
  public fetchLatestRecords(): void {
    this.http.get<TrackedRecord[]>(`${API_URL}/track/latest`).subscribe((data) => {
      this.latestRecords.next(data);
    }, error => this.snackBar.open('Error' + JSON.stringify(error), 'OK'));
  }
}
