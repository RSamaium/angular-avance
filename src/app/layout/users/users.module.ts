import { NgModule } from '@angular/core'
import { UsersComponent } from './users.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from './user-card/user-card.component'
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [UsersComponent, UserCardComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    exports: [UsersComponent]
})
export class UsersModule {}