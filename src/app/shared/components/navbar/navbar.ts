
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  role: string = '';

  constructor(private router: Router,private _auth: Auth) { }
  ngOnInit(): void {
    const payload = this._auth.getUserPayload();
    this.role = payload.role;  
  }

  logout() {
    this._auth.logout();
  }

  isLoggedIn() {
    return this._auth.getToken() !== null;
  }
}
