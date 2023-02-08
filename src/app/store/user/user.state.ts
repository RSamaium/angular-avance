import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, Observable, tap } from "rxjs";
import { User } from "src/app/core/interfaces/user";
import { NotificationService } from "src/app/core/services/notification.service";
import { UserService } from "src/app/core/services/user.service";
import { CreateUser, DeleteUser, GetUsers } from "./user.action";

export interface UserStateModel {
    users: User[],
    loading: boolean
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        users: [],
        loading: true
    }
})
@Injectable()
export class UserState {
    constructor(
        private userService: UserService,
        private notification: NotificationService
    ) { }

    @Selector()
    static getUserList(state: UserStateModel): User[] {
        return state.users
    }

    @Action(GetUsers)
    getUsers(context: StateContext<UserStateModel>, action: GetUsers): Observable<any> {
        return this.userService.getAll(action.sort)
            .pipe(
                tap((users: User[]) => {
                    /*const state = context.getState()
                    context.setState({
                        ...state,
                        users,
                        loading: false
                    })*/
                    context.patchState({
                        users,
                        loading: false
                    })
                })
            )
    }

    @Action(CreateUser)
    createUser(context: StateContext<UserStateModel>, action: CreateUser): Observable<any> {
        return this.userService.create(action.payload)
            .pipe(
                tap((user: User) => {
                    const state = context.getState()
                    context.patchState({
                        users: [ ...state.users, user ]
                    })
                    this.notification.success('Utilisateur créé')
                }),
                catchError((err) => {
                    this.notification.error('Erreur')
                    throw err
                })
            )
    }

    @Action(DeleteUser)
    deleteUser(context: StateContext<UserStateModel>, action: DeleteUser): Observable<any> {
        return this.userService.delete(action.id)
            .pipe(
                tap(() => {
                    const state = context.getState()
                    context.patchState({
                        users: state.users.filter(user => user.id !== action.id)
                    })
                    this.notification.success('Utilisateur supprimé')
                }),
                catchError((err) => {
                    this.notification.error('Erreur')
                    throw err
                })
            )
    }
}