import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.userService.users$
  color: string = ''

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.search$.subscribe((str: string) => {
      console.log(str)
    })
    this.userService.getAll().subscribe()
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