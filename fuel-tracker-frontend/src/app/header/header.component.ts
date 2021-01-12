import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
<mat-toolbar color="primary">
  <mat-toolbar color="primary" class="content-container">
    <span>Fuel Tracker</span>
    <span class="spacer"></span>
      <button mat-flat-button color="accent" [routerLink]="'/dashboard'"><mat-icon aria-hidden="false" aria-label="Dashboard">dashboard</mat-icon></button>
      <button mat-flat-button color="accent" [routerLink]="'/list'"><mat-icon aria-hidden="false" aria-label="Detailed list">list</mat-icon></button>
  </mat-toolbar>
</mat-toolbar>
`,
  styles: [
    `
  .spacer {
    flex: 1 1 auto;
  }
  button {
    margin: 0 1em 0 1em;
  }
  `
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
