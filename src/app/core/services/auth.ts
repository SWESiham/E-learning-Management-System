import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private _http: HttpClient, private router: Router) { };
  apiURL = 'http://localhost:3000/users';
  addUser(user: Users) {
    return this._http.post(this.apiURL, user);
  }
  getUserById(_id: string) {
    return this._http.get(`${this.apiURL}/${_id}`);
  }

  saveToken(user: Users) {
    const fakeHeader = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    const fakeSignature = "dWaQhPjhBgTIS179";
    const payload = btoa(JSON.stringify(user));

    const token = `${fakeHeader}.${payload}.${fakeSignature}`;
    localStorage.setItem('token', token);
  }

  getToken() {
    // console.log("token", localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  loginUser(email: string) {
    return this._http.get(`${this.apiURL}?email=${email}`);
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      // header.payload.signature
      const userPayload = atob(token.split('.')[1]);

      return JSON.parse(userPayload);
    }
    return null;
  }

  getUserRole(): string {
    const payload = this.getUserPayload();
    return payload ? payload.role : '';
  }

  isLoggedInWithRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }


updateUser(id: string, user: any) {
  return this._http.put(`${this.apiURL}/${id}`, user);
}
  logout() {
    localStorage.removeItem('token');

  }
}
