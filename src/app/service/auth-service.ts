import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:8084/jwtdemo/api/v1/auth';

    constructor(private http: HttpClient) { }

    signupUser(user: User): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(user);
        console.log(body)
        return this.http.post(this.baseUrl + '/signUpUser', body, { 'headers': headers })
    }

    loginUser(user: User): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(user);
        console.log(body)
        return this.http.post(this.baseUrl + '/userLogin', body, { 'headers': headers })
    }

    dahsboard(user: User): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/dashboard`, user);
    }
}
