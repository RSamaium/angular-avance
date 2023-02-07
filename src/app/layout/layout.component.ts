import { Component } from "@angular/core";

@Component({
    selector: 'app-layout',
    template: `
        <div class="container">
            <app-navbar [navbarConfig]="layoutConfig"></app-navbar>
            <button (click)="changeVersion()">Modifier la version</button>
            <router-outlet></router-outlet>
        </div>
    `
})
export class LayoutComponent {
    layoutConfig: any = {
        responsive: true,
        version: 1
    }

    changeVersion() {
        this.layoutConfig.version = Math.random()
    }
}