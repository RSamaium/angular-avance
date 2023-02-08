import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';
import { IStore } from 'src/app/store/store';
import { userGetAll } from 'src/app/store/user/user.action';
import { selectUserGetAll } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.store.select(selectUserGetAll)
  color: string = ''

  constructor(
    private userService: UserService,
    private store: Store<IStore>
  ) { }

  ngOnInit() {
    this.userService.search$.subscribe((str: string) => {
      console.log(str)
    })
    this.store.dispatch(userGetAll())
  }

  createUser(form: NgForm) {
    this.userService.create(form.value).subscribe({
      next: () => {
        form.resetForm()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe()
  }
}