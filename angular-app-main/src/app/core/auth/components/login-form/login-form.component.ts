import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { InputErrorMessageComponent } from '../../../components/input-error-message/input-error-message.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    MessageModule,
    MessagesModule,
    InputErrorMessageComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Input() formGroup: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  @Output() loginSubmitEmitter = new EventEmitter<
    typeof this.formGroup.value
  >();

  submitLogin() {
    // console.log(this.formGroup);
    this.loginSubmitEmitter.emit(this.formGroup.value);
  }

  constructor() {}
}
