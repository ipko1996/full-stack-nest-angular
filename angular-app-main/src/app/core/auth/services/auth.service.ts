/**
 * Could have done to store user with ngrx store
 * But for simplicity, I am storing user in local storage
 */

import { Injectable, signal } from '@angular/core';
import { HttpClientService } from '../../services/http-client/http-client.service';
import { map, tap } from 'rxjs';
import { User } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<User | null>(null);
  constructor(private http: HttpClientService) {
    const userRaw = localStorage.getItem('user');
    const userObj: User = userRaw ? JSON.parse(userRaw) : null;
    if (userObj) {
      this.user.set(userObj);
    }
  }

  login(username: string, password: string) {
    return this.http.post<User>(`/auth/login`, { username, password }).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.set(user);
        return user;
      })
    );
  }

  getRefreshToken() {
    return this.http.get<User>('/auth/refresh').pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.set(user);
        return user;
      })
    );
  }

  saveAccessToken(token: string) {
    const userRaw = localStorage.getItem('user');
    const userObj: User = userRaw ? JSON.parse(userRaw) : null;
    const updatedUser = { ...userObj, accessToken: token };
    this.user.set(updatedUser);
  }

  register(username: string, password: string) {
    return this.http
      .post<User>('/auth/register', {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.set(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.user.set(null);
  }
}
