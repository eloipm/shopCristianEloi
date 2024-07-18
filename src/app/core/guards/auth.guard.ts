import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const user = JSON.parse(localStorage.getItem('user')!);
    
    if (user) {
      return true;
    } else {
        console.log('Usuario no logeado')
      router.navigate(['user-form']);
      return false;
    }
};
