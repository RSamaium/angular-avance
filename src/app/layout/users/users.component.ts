import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.userService.users$

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.search$.subscribe((str: string) => {
      console.log(str)
    })
    this.userService.getAll().subscribe()
  }
}