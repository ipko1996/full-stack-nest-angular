import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../../../core/interfaces';
import { CommonModule } from '@angular/common';
import { Observable, catchError, first, of, timeout } from 'rxjs';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UsersTableComponent, CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent implements OnDestroy {
  public usersObservable$: Observable<User[]>;

  selectedUsers: User[] = [];
  usersData = this.userService.users;

  constructor(
    private userService: UsersService,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {
    if (auth.user()) {
      this.usersObservable$ = this.userService.getUsers().pipe(
        timeout(5000),
        catchError((error) => {
          // Only log error here, Loading ... will stuck but for simplicity I left it like this
          // This could be a nice solution: https://medium.com/angular-in-depth/angular-show-loading-indicator-when-obs-async-is-not-yet-resolved-9d8e5497dd8
          console.error('Error fetching users', error);
          if (error.status === 403) {
            this.messageService.add({
              severity: 'error',
              summary: 'Forbidden',
              detail: 'You are not allowed to view users',
            });
          }
          this.router.navigate(['/permission-denied']);
          return [];
        })
      );
    } else {
      this.usersObservable$ = of([]);
    }
  }

  deleteUser($event: any) {
    // show this feature is not implemented
    this.messageService.add({
      severity: 'warn',
      summary: 'Feature not implemented',
      detail: 'This feature is not implemented yet',
    });
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.userService.users.set([]);
  }
}
