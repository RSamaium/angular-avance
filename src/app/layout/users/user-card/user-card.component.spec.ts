import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let tpl: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    tpl = fixture.nativeElement
    component.user = {
      id: 1,
      name: 'ana',
      username: 'ana',
      email: 'ana@gmail.com'
    }
    fixture.detectChanges();
  });

  it('Tester si template correcte', () => {
     const nameEl = tpl.querySelector('header')
     const emailEl = tpl.querySelector('.email')
     expect(nameEl?.textContent).toContain(component.user.name)
     expect(emailEl?.textContent).toContain(component.user.email)
  });
});
