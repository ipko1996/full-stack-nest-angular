import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UsersTableComponent } from './users-table.component';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  const user = {
    bio: 'Test bio',
    email: '',
    id: 1,
    image: '',
    token: '',
    username: 'testuser',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        UsersTableComponent,
        TableModule,
        CommonModule,
        ButtonModule,
        ToolbarModule,
        ConfirmDialogModule,
      ],
      providers: [MessageService, ConfirmationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete selected users', () => {
    spyOn(component.deleteUserEmitter, 'emit');
    component.deleteUser(user);
    expect(component.deleteUserEmitter.emit).toHaveBeenCalledOnceWith(user);
  });

  it('should check if a row is selectable', () => {
    // TODO: Write test case to verify the isRowSelectable method
  });

  it('should check if a user is "me"', () => {
    // TODO: Write test case to verify the isMe method
  });
});
