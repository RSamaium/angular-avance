import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/interfaces/user";

export enum UserAction {
    GetAll = '[User] Get All',
    GetAllSuccess = '[User] Get All Success'
}

/*export function userGetAll() {
    return {
        type: UserAction.GetAll
    }
}*/

export const userGetAll = createAction(UserAction.GetAll, props<{
    sort?: string
}>())
export const userGetAllSuccess = createAction(UserAction.GetAllSuccess, props<{
    users: User[]
}>())