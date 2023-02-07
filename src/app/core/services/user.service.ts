import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { lastValueFrom, map, Observable } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url: string = 'https://jsonplaceholder.typicode.com/users'

    constructor(private http: HttpClient) {}

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
    }

    /*checkEmail(input: AbstractControl): Observable<{ emailExists: boolean } | null> {
        return this.http.get<User>(this.url + '/1')
            .pipe(
                map(user => user.email === input.value ? { emailExists: true } : null)
            )
    }*/

    checkEmail(input: AbstractControl): Promise<{ emailExists: boolean } | null> {
        return lastValueFrom(this.http.get<User>(this.url + '/1'))
            .then(user => user.email === input.value ? { emailExists: true } : null)
    }
}