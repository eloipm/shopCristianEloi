import { HttpInterceptorFn } from '@angular/common/http';

export const tokenAuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('entra en el interceptor');
  console.log(req.method);
  
  const token = sessionStorage.getItem('token');
  if (req.url.includes('profile')|| req.method==='DELETE') {
    const newreq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token!),
    });
    return next(newreq);
  }
  return next(req);
};
