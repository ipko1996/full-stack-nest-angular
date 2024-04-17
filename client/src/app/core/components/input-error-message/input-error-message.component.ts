import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export const getValidatorErrorMessage = (
  validatorName: string,
  validatorErrors?: ValidationErrors
): string | undefined => {
  let args = messages
    .get(validatorName)
    ?.validatorErrorsKey?.map((name) => validatorErrors?.[name]);
  return args
    ? stringFormat(messages.get(validatorName)?.message, ...args)
    : messages.get(validatorName)?.message;
};

const messages = new Map<
  string,
  { message: string; validatorErrorsKey?: string[] }
>([
  ['required', { message: 'This field is required' }],
  [
    'minlength',
    {
      message: 'Password must be at least {0} characters long',
      validatorErrorsKey: ['requiredLength'],
    },
  ],
  [
    'maxlength',
    {
      message: 'Password cannot be more than {0} characters long',
      validatorErrorsKey: ['requiredLength'],
    },
  ],
  ['email', { message: 'Email must be a valid email address' }],
  ['notSame', { message: 'Passwords must match' }],
]);

function stringFormat(template: string | undefined, ...args: any[]) {
  if (template) {
    return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }
  return undefined;
}

@Component({
  selector: 'app-input-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="errorMessage !== null">
      <small id="error-help" class="p-error">{{ errorMessage }}</small>
    </ng-container>
  `,
})
export class InputErrorMessageComponent {
  @Input()
  control!: AbstractControl;

  get errorMessage() {
    for (const validatorName in this.control?.errors) {
      if (this.control.touched)
        return getValidatorErrorMessage(
          validatorName,
          this.control.errors[validatorName]
        );
    }
    return null;
  }
}

/**
 * Kudos to https://itnext.io/building-a-reusable-validation-component-for-angular-forms-2f2e9bd13867
 */
