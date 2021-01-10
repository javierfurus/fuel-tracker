import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RecordDialogComponent } from './record-dialog/record-dialog.component';
import { ListRecordsComponent } from './list-records/list-records.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ListRecordsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'edit',
    component: RecordDialogComponent
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
