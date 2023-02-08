import { createReducer, on } from "@ngrx/store"
import { User } from "src/app/core/interfaces/user"
import { UserAction, userGetAll } from "./user.action"

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
    on(userGetAll, (state: UserState, action: { type: string }): UserState => {
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
    }),
    /*on(..., () => {

    })*/
)