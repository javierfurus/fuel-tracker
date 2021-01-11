import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main class="content-container" style="margin-top: 100px;">
      <router-outlet></router-outlet>
</main>
  `,
  styles: [``],
})
export class AppComponent { }
