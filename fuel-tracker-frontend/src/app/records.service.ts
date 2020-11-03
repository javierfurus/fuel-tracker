import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_URL = environment.FUEL_TRACKER_API;
export interface TrackedRecord {
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
  tracks: TrackedRecord[];
  interval: any;
  deletedRow: string;
  constructor(
    private http: HttpClient,
  ) { }

  public deleteRecord(id: number): Observable<string> {
    return this.http
      .delete(API_URL + id, { responseType: 'text' });
  }
  public updateRecord(trackRow): Observable<object> {
    const id = trackRow.id;
    return this.http
      .put(API_URL + id, trackRow);
  }

  public createRecord(newRecord): Observable<object> {
    console.log(newRecord);
    return this.http
      .post(API_URL, newRecord);
  }

  public fetchRecords(): Observable<TrackedRecord[]> {
    return this.http.get<TrackedRecord[]>(API_URL);
  }

  public onDeleteRecord(trackRow): void {
    this.deleteRecord(trackRow.id).subscribe();
  }

  public onUpdateRecord(trackRow): void {
    this.updateRecord(trackRow).subscribe();
  }

  public onCreateRecord(newRecord): void {
    this.createRecord(newRecord).subscribe();
  }

}
