import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private baseUrl = 'http://localhost:8084/jwtdemo/api/v1/user';

    constructor(private http: HttpClient) { }

    dahsboard(): Observable<any> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/dashboard`, { headers });
    }
}
