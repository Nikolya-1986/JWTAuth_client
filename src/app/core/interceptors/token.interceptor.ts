import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken: string | null = authService.getToken();
  if (accessToken) {
    const cloned = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + accessToken,
      )
    });
    return next(cloned)
  };
  
  return next(req);
};
