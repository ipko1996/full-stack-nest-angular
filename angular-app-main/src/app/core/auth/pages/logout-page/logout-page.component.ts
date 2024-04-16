import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.css',
})
export class LogoutPageComponent {
  constructor(private router: Router) {}

  toLogin() {
    this.router.navigateByUrl('/auth');
  }
}
