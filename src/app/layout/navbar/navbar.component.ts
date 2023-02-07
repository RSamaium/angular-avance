import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy, DoCheck {
    search: FormControl = new FormControl()
    title$: Observable<string> = this.appService.title$
    subscription!: Subscription
    count: number = 0

    @Input() navbarConfig: any = {}

    constructor(
        private userService: UserService,
        private appService: AppService,
        // private zone: NgZone,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngDoCheck() {
        this.changeDetectorRef.detectChanges()
    }

    ngOnInit() {
        this.subscription = this.search.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((str: string) => {
                this.userService.setSearch(str)
            })
        /*setInterval(() => {
            this.count++
            if (this.count % 2 == 0) {
                //this.changeDetectorRef.detectChanges()
            }
        }, 1000)*/
    }

    changeTitle() {
        this.appService.setTitle('' + Math.random()) // action
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}