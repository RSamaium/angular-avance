import { HttpClientModule } from "@angular/common/http"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UsersComponent } from "./users.component"
import { UserService } from 'src/app/core/services/user.service'
import { Observable, of } from "rxjs"
import { User } from "src/app/core/interfaces/user"

class UserServiceMock {
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
}

describe('Tester UsersComponent', () => {
    let fixture: ComponentFixture<UsersComponent>
    let component: UsersComponent
    let tpl: HTMLElement
    let service: UserService

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UsersComponent],
            imports: [HttpClientModule],
            providers: [{
                provide: UserService,
                useClass: UserServiceMock
            }]
        }).compileComponents()

        fixture = TestBed.createComponent(UsersComponent)
        service = TestBed.inject(UserService)
        fixture.detectChanges() // déclenche ngOnInit
        await fixture.whenStable()
        fixture.detectChanges() // mettre à jour les users
        component = fixture.componentInstance
        tpl = fixture.nativeElement
    })

    it('Le template contient des utilisateurs', async () => {
        const cardsEl = tpl.querySelectorAll('.card')
        expect(component.users.length).toBeGreaterThan(0)
        expect(cardsEl.length).toBe(component.users.length)
    })
})