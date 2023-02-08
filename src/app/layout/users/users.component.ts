import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { IStore } from 'src/app/store/store';
import { userCreate, userDelete, userGetAll } from 'src/app/store/user/user.action';
import { selectUserGetAll } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.userService.usersFiltered$
  color: string = ''

  constructor(
    private userService: UserService,
    private store: Store<IStore>
  ) { }

  ngOnInit() {
    this.userService.search$.subscribe((str: string) => {
      console.log(str)
    })
    this.store.dispatch(userGetAll({ sort: 'name' }))
  }

  createUser(form: NgForm) {
    this.store.dispatch(userCreate(form.value))
  }

  deleteUser(id: number) {
    this.store.dispatch(userDelete({ id }))
  }
}