export class GetUsers {
    static readonly type = '[User] Get All'

    constructor(public sort?: string) {}
}