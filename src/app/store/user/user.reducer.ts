import { createReducer, on } from "@ngrx/store"
import { User } from "src/app/core/interfaces/user"
import { UserAction, userCreateSuccess, userDeleteSuccess, userGetAll, userGetAllSuccess } from "./user.action"

export interface UserState {
    users: User[],
    loading: boolean
}

const initialState: UserState = {
    users: [],
    loading: true
}

/*export function userReducer(state: UserState, action: { type: string }): UserState {
    switch (action.type) {
        case UserAction.GetAll:
            return {
                users: [
                    {
                        id: 1,
                        name: 'ana',
                        email: 'ana@test.com'
                    }
                ],
                loading: false
            }
    }
    return {
        users: [],
        loading: false
    }
}*/

export const userReducer = createReducer(
    initialState,
    on(userGetAllSuccess, (state: UserState, action: { users: User[] }): UserState => {
        return {
            ...state,
            users: action.users,
            loading: false
        }
    }),
    on(userCreateSuccess, (state: UserState, action: { user: User }): UserState => {
        return {
            ...state,
            users: [ ...state.users, action.user ]
        }
    }),
    on(userDeleteSuccess, (state: UserState, action: { id: number }): UserState => {
        return {
            ...state,
            users: state.users.filter(user => user.id !== action.id)
        }
    })
)