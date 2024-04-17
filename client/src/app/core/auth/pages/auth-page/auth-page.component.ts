import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
  imports: [
    LoginFormComponent,
    TabViewModule,
    ButtonModule,
    RegistrationFormComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AuthPageComponent {
  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('passwordConfirmation')?.value;

    const confirmPassErr = group.get('passwordConfirmation');

    if (pass === confirmPass) {
      confirmPassErr?.setErrors(null);
      return null;
    } else {
      confirmPassErr?.setErrors({ notSame: true });
      return { validator: true };
    }
  };

  submitLoginForm() {
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid || !username || !password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Username and Password are required',
      });
      return;
    }

    this.auth
      .login(username, password)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        },
      });
  }

  submitRegistrationForm() {
    console.log(this.registrationForm);
    const username = this.registrationForm.controls.username.value;
    const password = this.registrationForm.controls.password.value;
    const passwordConfirmation =
      this.registrationForm.controls.passwordConfirmation.value;

    this.registrationForm.markAllAsTouched();

    if (
      this.registrationForm.invalid ||
      !username ||
      !password ||
      !passwordConfirmation
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Username, Password, and Password Confirmation are required',
      });
      return;
    }

    this.auth
      .register(username, password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account created successfully',
          });
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        },
      });
  }

  loginForm: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  registrationForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      passwordConfirmation: new FormControl(''),
    },
    { validators: this.checkPasswords }
  );

  backToHome() {
    this.router.navigateByUrl('/');
  }

  activeIndex: number = 0;
  constructor(
    private messageService: MessageService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // If user is already logged in, redirect to home page or where user was trying to go
    if (this.auth.user()) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    }
  }
}
