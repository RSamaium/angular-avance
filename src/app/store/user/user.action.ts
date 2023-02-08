import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/interfaces/user";
import { UserPayload } from "src/app/core/services/user.service";

export enum UserAction {
    GetAll = '[User] Get All',
    GetAllSuccess = '[User] Get All Success',
    Create = '[User] Create',
    CreateSuccess = '[User] Create Success',
    Delete = '[User] Delete',
    DeleteSuccess = '[User] Delete Success'
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

export const userCreate = createAction(UserAction.Create, props<UserPayload>())
export const userCreateSuccess = createAction(UserAction.CreateSuccess, props<{
    user: User
}>())

export const userDelete = createAction(UserAction.Delete, props<{
    id: number
}>())
export const userDeleteSuccess = createAction(UserAction.DeleteSuccess, props<{
    id: number
}>())