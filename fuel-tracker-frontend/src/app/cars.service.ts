import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { RecordDialogComponent } from './record-dialog/record-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
const API_URL = environment.FUEL_TRACKER_API;

export interface CarRecord {
  id?: number;
  name: string;
  tankSize: number;
  currentFuelLevel: number;
  tripState: number;
  fuelPercent: number;
}
@Injectable({
  providedIn: 'root'
})
export class CarsService {
  records = new Subject<CarRecord>();

  constructor(private http: HttpClient,
    private readonly snackBar: MatSnackBar) { }

  public fetchRecords(): void {
    this.http.get<CarRecord>(`${API_URL}/car`).subscribe((data: CarRecord) => {
      this.records.next(data);
    }, error => this.snackBar.open('Error' + JSON.stringify(error), 'OK'));
  }
}
