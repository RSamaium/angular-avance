import { NgModule } from '@angular/core'
import { UsersComponent } from './users.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from './user-card/user-card.component'

@NgModule({
    declarations: [UsersComponent, UserCardComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [UsersComponent]
})
export class UsersModule {}