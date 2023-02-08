import { createAction } from "@ngrx/store";

export enum UserAction {
    GetAll = '[User] Get All'
}

/*export function userGetAll() {
    return {
        type: UserAction.GetAll
    }
}*/

export const userGetAll = createAction(UserAction.GetAll)