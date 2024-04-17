import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { User } from '../../../../core/interfaces';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ToolbarModule,
    ConfirmDialogModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent {
  @Input() users!: User[];
  @Input() selectedUsers!: User[];

  @Output() deleteUserEmitter = new EventEmitter();

  deleteUser(user: User) {
    this.deleteUserEmitter.emit(user);
  }

  isRowSelectable(data: any, index: number) {
    // return !this.isMe(event.data);
  }

  isMe(data: User) {
    return false;
  }

  // FIXME: https://github.com/primefaces/primeng/issues/15259
  // should check later if they merged the fix
  constructor() {
    //this.isRowSelectable = this.isRowSelectable.bind(this);
  }
}
