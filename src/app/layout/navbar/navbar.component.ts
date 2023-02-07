import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
    search: FormControl = new FormControl()
    title$: Observable<string> = this.appService.title$
    subscription!: Subscription

    constructor(
        private userService: UserService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.subscription = this.search.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((str: string) => {
                this.userService.setSearch(str)
            })
    }

    changeTitle() {
        this.appService.setTitle(''+Math.random()) // action
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}