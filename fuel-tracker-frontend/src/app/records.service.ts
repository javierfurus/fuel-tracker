import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  records$: BehaviorSubject<TrackedRecord[]> = new BehaviorSubject<TrackedRecord[]>([]);

  constructor(private http: HttpClient,
              private readonly snackBar: MatSnackBar) { }

  async deleteRecord(id: number): Promise<void> {
    try {
      await this.http.delete(API_URL + id, { responseType: 'text' }).toPromise();
    } catch (e) {
      this.snackBar.open('Error', 'OK');
    }
    this.fetchRecords();
    this.snackBar.open('Record Deleted', 'OK');
    return;
  }

  public async updateRecord(trackRow: TrackedRecord): Promise<void> {
    try {
      await this.http.put(API_URL + trackRow.id, trackRow).toPromise();
    } catch (e) {
      this.snackBar.open('Error', 'OK');
    }
    this.fetchRecords();
    this.snackBar.open('Record Updated', 'OK');
    return;
  }

  public createRecord(newRecord: TrackedRecord, ref: MatDialogRef<RecordDialogComponent>): void {
    this.http.post(API_URL, newRecord, { responseType: 'text' }).subscribe(() => {
      this.fetchRecords();
      this.snackBar.open('Record Created', 'OK');
      ref.close();
    }, error => this.snackBar.open('Error', 'OK'));
  }

  public fetchRecords(): void {
    this.http.get<TrackedRecord[]>(API_URL).subscribe((data) => {
      this.records$.next(data);
    }, error => this.snackBar.open('Error', 'OK'));
  }
}
