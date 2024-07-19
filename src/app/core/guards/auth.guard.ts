import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const user = JSON.parse(sessionStorage.getItem('user')!);
    
    if (user) {
      return true;
    } else {
      router.navigate(['user-form']);
      return false;
    }
};
