import { Routes, RouterModule } from '@angular/router'
import { LayoutComponent } from './layout.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
        {
            path: '',
            component: UsersComponent
        }
    ]
}]

export const layoutRouter = RouterModule.forChild(routes)