import { Component } from "@angular/core";

@Component({
    selector: 'app-layout',
    template: `
        <div class="container">
            <app-navbar></app-navbar>
            <router-outlet></router-outlet>
        </div>
    `
})
export class LayoutComponent {}