import { HttpInterceptorFn } from '@angular/common/http';

export const tokenAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  if (req.url.includes('profile')) {
    console.log('ENTRA INT.');
    const newreq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token!),
    });
    return next(newreq);
  }
  return next(req);
};
