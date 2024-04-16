import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';

export const blacklist = ['login', 'logout', 'auth', 'refresh', 'token'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const user = auth.user();
  if (user !== null && user?.accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isWhitelist = !blacklist.find((url) => req.url.match(url));
      if (
        error instanceof HttpErrorResponse &&
        isWhitelist &&
        error.status === 401
      ) {
        return handle401Error(req, next, auth);
      }
      auth.logout();
      return throwError(() => error);
    })
  );
};

const handle401Error = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  auth: AuthService
) => {
  const { refreshToken } = auth.user()!;
  auth.saveAccessToken(refreshToken);

  return auth.getRefreshToken().pipe(
    switchMap(() => {
      const accessToken = auth.user()?.accessToken!;
      return next(addToken(req, accessToken));
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        // Redirect to login page
      }
      return throwError(() => error);
    })
  );
};

const addToken = (req: HttpRequest<unknown>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
