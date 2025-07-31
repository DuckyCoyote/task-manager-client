import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

const API_BASE = 'http://localhost:4000/api/v1'; // ajustar si cambia

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private tokenKey = 'token';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor() {
    // Solo verificar el estado de autenticación en el browser
    if (isPlatformBrowser(this.platformId)) {
      this._isLoggedIn.next(!!this.getToken());
    }
  }

  register(nombre: string, email: string, password: string) {
    return this.http.post(`${API_BASE}/auth/register`, {
      nombre,
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${API_BASE}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          if (res.token && isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.tokenKey, res.token);
            this._isLoggedIn.next(true);
          }
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this._isLoggedIn.next(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }
}
