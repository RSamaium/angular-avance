import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { User } from "src/app/core/interfaces/user";
import { UserService } from "src/app/core/services/user.service";
import { GetUsers } from "./user.action";

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
    constructor(private userService: UserService) { }

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
}