import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, Observable, switchMap } from "rxjs";
import { UserService } from "src/app/core/services/user.service";
import { userGetAll, userGetAllSuccess } from "./user.action";

@Injectable({
    providedIn: 'root'
})
export class UserEffect {
    loadUsers$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userGetAll),
            switchMap(({ sort }) => {
                return this.userService.getAll(sort)
            }),
            map(users => userGetAllSuccess({ users }))
        )
    })

   // otherAction$: Observable<Action> = createEffect()

    constructor(
        private userService: UserService,
        private actions$: Actions
    ) { }
}