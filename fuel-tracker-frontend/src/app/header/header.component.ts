import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
<mat-toolbar color="primary" class="mat-elevation-z8">
  <span>Fuel Tracker</span>
  <span class="spacer"></span>
  <button mat-flat-button color="accent" [routerLink]="'/list'"><mat-icon aria-hidden="false" aria-label="Add new item">home</mat-icon></button>
</mat-toolbar>
`,
  styles: [
    `
  .spacer {
    flex: 1 1 auto;
  }
  `
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
