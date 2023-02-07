import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: User = {} as User
  @Output() onDelete: EventEmitter<number> = new EventEmitter()

  removeUser() {
     this.onDelete.emit(this.user.id)
  }
}
