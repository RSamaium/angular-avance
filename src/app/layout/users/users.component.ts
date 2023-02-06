import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
    users: User[] = []

    constructor(private userService: UserService) { }

    ngOnInit() { 
       this.userService.getAll().subscribe((users: User[]) => {
         this.users = users
       }) 
    }
}