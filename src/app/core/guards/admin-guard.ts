import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';


export const adminGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth);  
  const routes = inject(Router);  

  if(auth.isLoggedInWithRole('admin')){
    return true;
  }

  else {
    routes.navigate(['/login']);
    return false;
  }

};