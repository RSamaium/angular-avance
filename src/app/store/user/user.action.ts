import { UserPayload } from "src/app/core/services/user.service"

export class GetUsers {
    static readonly type = '[User] Get All'

    constructor(public sort?: string) {}
}

export class CreateUser {
    static readonly type = '[User] Create'

    constructor(public payload: UserPayload) {}
}

export class DeleteUser {
    static readonly type = '[User] Delete'

    constructor(public id: number) {}
}