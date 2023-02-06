import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
}