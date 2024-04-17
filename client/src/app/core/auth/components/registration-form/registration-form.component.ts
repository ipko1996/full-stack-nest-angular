import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { InputErrorMessageComponent } from '../../../components/input-error-message/input-error-message.component';

@Component({
  selector: 'app-registration-form',
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
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent {
  @Input() formGroup: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
    passwordConfirmation: FormControl<string | null>;
  }> = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    passwordConfirmation: new FormControl(),
  });

  @Output() registrationSubmitEmitter = new EventEmitter<
    typeof this.formGroup.value
  >();

  submitRegistration() {
    // console.log(this.formGroup);
    this.registrationSubmitEmitter.emit(this.formGroup.value);
  }
}
