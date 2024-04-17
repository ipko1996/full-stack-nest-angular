import { Injectable, signal } from '@angular/core';
import { HttpClientService } from '../../../core/services/http-client/http-client.service';
import { User } from '../../../core/interfaces';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users = signal<User[]>([]);
  constructor(private http: HttpClientService) {}

  getUsers() {
    return this.http.get<User[]>('/users').pipe(
      map((users) => {
        this.users.set(users);
        return users;
      })
    );
  }
}
