import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

let refreshInFlight$: Observable<any> | null = null;

function getToken() {
  return localStorage.getItem('auth_token');
}

function getExpiryMs() {
  const value = localStorage.getItem('expire_time');
  return value ? new Date(value).getTime() : 0;
}

function shouldRefreshSoon() {
  const expiryMs = getExpiryMs();
  const now = Date.now();
  const refreshWindowMs = 60_000;

  return expiryMs > 0 && now >= expiryMs - refreshWindowMs;
}

function refreshSession(): Observable<any> {
  if (refreshInFlight$) {
    return refreshInFlight$;
  }

  const refreshToken = localStorage.getItem('refresh_token');

    const apiUrl = environment.apiUrl;
  refreshInFlight$ = new Observable((observer) => {
    fetch(`${apiUrl}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Refresh failed');
        }

        const data = await response.json();
        localStorage.setItem('auth_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        localStorage.setItem('expire_time', new Date(Date.now() + data.expiresIn).toISOString());

        observer.next(data);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  }).pipe(
    finalize(() => {
      refreshInFlight$ = null;
    })
  );

  return refreshInFlight$;
}

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getToken();
  if (req.url.includes('/login') || req.url.includes('/refresh')) {
    return next(req);
  }

  if (!token) {
    return next(req);
  }

  if (shouldRefreshSoon()) {
    return refreshSession().pipe(
      switchMap(() => {
        const newToken = getToken();
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`
          }
        });

        return next(cloned);
      }),
      catchError(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expire_time');
        return throwError(() => new Error('Session expired'));
      })
    );
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloned);
};
