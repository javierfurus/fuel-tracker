import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RecordDialogComponent } from './record-dialog/record-dialog.component';
import { ListRecordsComponent } from './list-records/list-records.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'list',
    component: ListRecordsComponent
  },
  {
    path: 'edit',
    component: RecordDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
