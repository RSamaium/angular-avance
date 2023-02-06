import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from './layout.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
            path: '',
            component: UsersComponent
        }
    ]
}]

export const layoutRouter = RouterModule.forChild(routes)