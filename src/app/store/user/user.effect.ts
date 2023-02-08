import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, Observable, switchMap, tap } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";
import { UserService } from "src/app/core/services/user.service";
import { userCreate, userCreateSuccess, userGetAll, userGetAllSuccess } from "./user.action";

@Injectable({
    providedIn: 'root'
})
export class UserEffect {
    loadUsers$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userGetAll),
            switchMap(({ sort }) => this.userService.getAll(sort)),
            map(users => userGetAllSuccess({ users }))
        )
    })

    createUser$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(userCreate),
            switchMap(payload => this.userService.create(payload)),
            map(user => userCreateSuccess({ user })),
            tap(() => this.notification.success('Utilisateur créé')),
            catchError((err: HttpErrorResponse) => {
                this.notification.error('Erreur')
                throw err
            })
        )
    })

   // otherAction$: Observable<Action> = createEffect()

    constructor(
        private userService: UserService,
        private actions$: Actions,
        private notification: NotificationService
    ) { }
}