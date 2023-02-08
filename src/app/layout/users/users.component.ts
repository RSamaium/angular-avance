import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { CreateUser, DeleteUser, GetUsers } from 'src/app/store/user/user.action';
import { UserState } from 'src/app/store/user/user.state';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  @Select(UserState.getUserList) users$!: Observable<User[]>
  color: string = ''

  constructor(
    private userService: UserService,
    private store: Store
  ) { }

  ngOnInit() {
    this.userService.search$.subscribe((str: string) => {
      console.log(str)
    })
    this.store.dispatch(new GetUsers('name'))
  }

  createUser(form: NgForm) {
    this.store.dispatch(new CreateUser(form.value))
  }

  deleteUser(id: number) {
    this.store.dispatch(new DeleteUser(id))
  }
}