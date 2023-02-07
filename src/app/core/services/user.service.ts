import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { BehaviorSubject, lastValueFrom, map, Observable, tap } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url: string = 'https://jsonplaceholder.typicode.com/users'
    private _search$: BehaviorSubject<string> = new BehaviorSubject('')
    private _users$: BehaviorSubject<User[]> = new BehaviorSubject([] as User[])
    readonly users$: Observable<User[]> = this._users$.asObservable()
    
    // readonly search$: Observable<string> = this._search$.asObservable()
    get search$(): Observable<string> {
        return this._search$.asObservable()
    }

    setSearch(str: string) {
        this._search$.next(str)
    }

    constructor(private http: HttpClient) {}

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
            .pipe(
                tap((users) => {
                    //const listUsers = this._users$.value
                    this._users$.next(users)
                })
            )
    }

    /*checkEmail(input: AbstractControl): Observable<{ emailExists: boolean } | null> {
        return this.http.get<User>(this.url + '/1')
            .pipe(
                map(user => user.email === input.value ? { emailExists: true } : null)
            )
    }*/

    /*checkEmail(input: AbstractControl): Promise<{ emailExists: boolean } | null> {
        return lastValueFrom(this.http.get<User>(this.url + '/1'))
            .then(user => user.email === input.value ? { emailExists: true } : null)
    }*/

    async checkEmail(input: AbstractControl): Promise<{ emailExists: boolean } | null> {
        const user = await lastValueFrom(this.http.get<User>(this.url + '/1'))
        return user.email === input.value ? { emailExists: true } : null
    }
}