import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })
  constructor(private _auth: Auth, private _router: Router) { };

  login() {
    if (this.loginForm.invalid) return;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this._auth.loginUser(email).subscribe({
      next: (res: any) => {
        if (res.length === 0) {
          return;
        }

        const user = res[0];
        if (user.password === password) {
          console.log("Login Success", user);

          this._auth.saveToken(user);
          console.log(user.role);
          
          if(user.role.toLowerCase() === 'instructor') {
            this._router.navigate(['/instructor/courses']);
          } else if(user.role.toLowerCase() === 'student') {
            this._router.navigate(['/student/my-courses']);
          }else if(user.role.toLowerCase() === 'admin') {
            this._router.navigate(['']);
          }
        } else {
          alert("Invalid Credentials!");
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
