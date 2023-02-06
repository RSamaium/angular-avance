import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UsersComponent } from "./users.component"
import { UserService } from 'src/app/core/services/user.service'
import { Observable, of } from "rxjs"
import { User } from "src/app/core/interfaces/user"
import { UserCardComponent } from './user-card/user-card.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'

/*class UserServiceMock {
    getAll(): Observable<User[]> {
        return of([
            {
                id: 1,
                name: 'ana',
                username: 'ana',
                email: 'ana@gmail.com'
            }
        ])
    }
}*/

describe('Tester UsersComponent', () => {
    let fixture: ComponentFixture<UsersComponent>
    let component: UsersComponent
    let tpl: HTMLElement
    let service: UserService
    let httpMock: HttpTestingController

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UsersComponent, UserCardComponent],
            imports: [HttpClientTestingModule],
            //schemas: [NO_ERRORS_SCHEMA]
            /*providers: [{
                provide: UserService,
                useClass: UserServiceMock
            }]*/
        }).compileComponents()

        fixture = TestBed.createComponent(UsersComponent)
        service = TestBed.inject(UserService)
        httpMock = TestBed.inject(HttpTestingController)
        fixture.detectChanges() // déclenche ngOnInit
        await fixture.whenStable()
        component = fixture.componentInstance
        tpl = fixture.nativeElement
    })

    it('Le template contient des utilisateurs', async () => {
        const requestHttp = httpMock.expectOne(service.url)
        expect(requestHttp.request.method).toBe('GET')
        requestHttp.flush([
            {
                id: 1,
                name: 'ana',
                username: 'ana',
                email: 'ana@gmail.com'
            }
        ])

        fixture.detectChanges() // mettre à jour les users

        const cardsEl = tpl.querySelectorAll('app-user-card')
        expect(component.users.length).toBeGreaterThan(0)
        expect(cardsEl.length).toBe(component.users.length)

        /*const cardComponent = fixture.debugElement.query(By.directive(UserCardComponent))
        cardComponent.componentInstance.user
        */
    })

    afterEach(() => {
        httpMock.verify()
    })
})