import { Component, OnInit, effect } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './core/auth/services/auth.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule,
    MenubarModule,
    SplitButtonModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;
  title = 'angular-frontend';

  user = this.auth.user();

  ngOnInit(): void {
    this.items = [
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.auth.logout();
          this.router.navigateByUrl('/auth/logout');
        },
      },
    ];
  }

  toProfile() {
    this.router.navigateByUrl('/profile');
  }

  toLogin() {
    this.router.navigateByUrl('/auth');
  }

  constructor(private auth: AuthService, private router: Router) {
    effect(() => {
      this.user = this.auth.user();
    });
  }

  // Hide the navbar in the login page for example
  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
