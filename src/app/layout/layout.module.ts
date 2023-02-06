import { NgModule } from '@angular/core'
import { LayoutComponent } from './layout.component'
import { NavbarModule } from './navbar/navbar.module'
import { UsersModule } from './users/users.module'
import { layoutRouter } from './layout.router'

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        NavbarModule,
        UsersModule,
        layoutRouter
    ]
})
export class LayoutModule {}