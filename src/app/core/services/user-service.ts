import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) { }

  apiURL = 'http://localhost:3000';

  getAllUsers() {
    return this._http.get(`${this.apiURL}/users`);
  }

  deleteUser(userId: number) {
    return this._http.delete(`${this.apiURL}/users/${userId}`);
  }

  updateUser(userId: number, data: any) {
    return this._http.put(`${this.apiURL}/users/${userId}`, data);
  }

  updateUserStatus(userId: string, newStatus: boolean) {
  return this._http.patch(`${this.apiURL}/users/${userId}`, { isActive: newStatus });
}



  
  
}
