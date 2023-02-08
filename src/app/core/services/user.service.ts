import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { BehaviorSubject, catchError, debounceTime, lastValueFrom, map, Observable, retry, switchMap, tap, throwError, timer } from "rxjs";
import { User } from "../interfaces/user";
import { NotificationService } from "./notification.service";

export type UserPayload = Omit<User, 'id'>

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url: string = 'https://jsonplaceholder.typicode.com/users'
    private _search$: BehaviorSubject<string> = new BehaviorSubject('')
    
    // readonly search$: Observable<string> = this._search$.asObservable()
    get search$(): Observable<string> {
        return this._search$.asObservable()
    }

    setSearch(str: string) {
        this._search$.next(str)
    }

    constructor(
        private http: HttpClient,
        private notification: NotificationService
    ) {}

    getAll(sort?: string): Observable<User[]> {
        return this.http.get<User[]>(this.url + (sort ? '?_sort=' + sort : ''))
    }

    create(payload: UserPayload): Observable<User> {
        return this.http.post<User>(this.url, payload)
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.url + '/' + id)
    }

    checkEmail(input: AbstractControl): Observable<{ emailExists: boolean } | null> {
        return timer(500)
            .pipe(
                switchMap(() => this.http.get<User>(this.url + '/1')),
                map(user => user.email === input.value ? { emailExists: true } : null)
            )
    }

    /*checkEmail(input: AbstractControl): Promise<{ emailExists: boolean } | null> {
        return lastValueFrom(this.http.get<User>(this.url + '/1'))
            .then(user => user.email === input.value ? { emailExists: true } : null)
    }*/

    /*async checkEmail(input: AbstractControl): Promise<{ emailExists: boolean } | null> {
        const user = await lastValueFrom(this.http.get<User>(this.url + '/1'))
        return user.email === input.value ? { emailExists: true } : null
    }*/
}