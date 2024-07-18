import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user')!);
  
  if (user) {
    if (user.role === 'admin') {
      return true;
    } else {
      router.navigate(['no-auth']);
      return false;
    }
  } else {
    router.navigate(['user-form']);
    return false;
  }
};