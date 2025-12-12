import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', Validators.required),
    isActive: new FormControl(false),
    agreeTerms: new FormControl(false, Validators.requiredTrue)
  })

  constructor(private _user: Auth, private _router: Router) { };
  register() {
    if (this.registerForm.invalid) return;
    const formData = { ...this.registerForm.value }

    delete formData.confirmPassword;
    delete formData.agreeTerms;
    this._user.addUser(formData).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['auth/login']);
      }, error(err) {
        console.log(err);
      }, complete() {
        console.log("user registered successfully");
      },
    })
  }
  setRole(role: string) {
    this.registerForm.get('role')?.setValue(role);
  }


  //confirm password match password

  Matcher: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword')
    if (!password || !confirmPassword)
      return null;
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true }
    }
    return null;
  }
}
