import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { catchError, Observable, of, tap, map, switchMap } from 'rxjs';
import { environment } from '@environments/environment';
import { ILogin } from '@models/iLogin';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { IRole } from '@models/iRole';
import { IRoleAssignment } from '@models/iRoleAssignment';

export interface UserProfile {
  email: string;
  id: string;
  roles: string[];
}

interface LoginResponse {
  accessToken: string; 
  expiresIn: number;
  refreshToken: string
  tokenType: string;
}

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;
  // 1. Tracks profile data, never the raw token string
  private tokenSignal = signal<LoginResponse | null>(null);
  private isLoggedIn$ = toObservable(this.tokenSignal).pipe(map(token => !!token));
  private userProfile = signal<UserProfile | null>(null);
  readonly userRoles = computed(() => this.userProfile()?.roles);
  readonly userEmail = computed(() => this.userProfile()?.email);
  readonly isAuthenticated = computed(() => this.tokenSignal() !== null);

  // 2. Run on app initialization to check if a valid cookie already exists
  checkSession() : Observable<UserProfile | null> {
    const storedToken = this.getTokenFromLocalStorage();
    if (storedToken) {
      this.tokenSignal.set(storedToken);
    }

    return this.http.get<UserProfile>(`${this.apiUrl}/auth/me`).pipe(
      tap(userProfile => {
        if(!!userProfile) {
          this.userProfile.set(userProfile);
        }
      }),
      catchError(() => {
        this.tokenSignal.set(null);
        this.userProfile.set(null);
        return of(null);
      })
    );
  }

  register(user: IRegistration) : Observable<unknown> {
    return this.http.post<unknown>(`${this.apiUrl}/register`, user)
  }

  login(credentials: ILogin): Observable<UserProfile | null> {
    // The backend sets the HttpOnly cookie in the response headers
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        const expireTime = new Date(Date.now() + user.expiresIn);
        localStorage.setItem('auth_token', user.accessToken);
        localStorage.setItem('refresh_token', user.refreshToken);
        localStorage.setItem('expire_time', expireTime.toISOString());
        this.tokenSignal.set(user)
      }),
      switchMap(x => {
        return this.checkSession();
      })
    );
  }
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expire_time');
    this.userProfile.set(null);
    this.tokenSignal.set(null);
    this.router.navigate(['/']);
  }
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');

    return this.http.post<any>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(response => {
        this.tokenSignal.set(response);
        const expiresAt = new Date(Date.now() + response.expiresIn).toISOString();
        localStorage.setItem('auth_token', response.accessToken);
        localStorage.setItem('refresh_token', response.refreshToken);
        localStorage.setItem('expire_time', expiresAt);
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  getAllRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(`${this.apiUrl}/auth/role`);
  }

  assignRole(roleAssignment: IRoleAssignment): Observable<unknown>{
    return this.http.post(`${this.apiUrl}/auth/assign-role`, roleAssignment);
  }

  getTokenFromLocalStorage(): LoginResponse | null {
    const accessToken = localStorage.getItem('auth_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const expireTime = localStorage.getItem('expire_time');

    if (!accessToken || !refreshToken || !expireTime) {
      this.tokenSignal.set(null);
      return null;
    }

    const expiresIn = Math.max(0, new Date(expireTime).getTime() - Date.now());
    const storedToken: LoginResponse = {
      accessToken,
      refreshToken,
      expiresIn,
      tokenType: 'Bearer'
    };

    this.tokenSignal.set(storedToken);
    return storedToken;
  }
}
