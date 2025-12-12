
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(private router: Router, private _auth: Auth) { }

  logout() {
    this._auth.logout();
    this.router.navigate(['auth/login']);
  }

  isLoggedIn() {
    return this._auth.getToken() !== null;
  }

  isStudent(): boolean {
    return this._auth.getUserRole() == 'Student';
  }
  isInstructor(): boolean {
    return this._auth.getUserRole() == 'Instructor';
  }
  isAdmin(): boolean {
    return this._auth.getUserRole().toLowerCase() == 'admin';
  }

}