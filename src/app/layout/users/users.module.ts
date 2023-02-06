import { NgModule } from '@angular/core'
import { UsersComponent } from './users.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [UsersComponent]
})
export class UsersModule {}