import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { first } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUserResponse = {
    user: {
      id: '1',
      email: 'test@example.com',
      token: 'token',
      username: 'testuser',
      bio: '',
      image: '',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const email = 'test@example.com';
    const password = 'password';
    const username = 'testuser';

    service
      .register(email, password, username)
      .pipe(first())
      .subscribe((user) => {
        expect(user.username).toEqual(mockUserResponse.user.username);
      });

    const req = httpMock.expectOne('http://localhost:3000/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password, username });

    req.flush(mockUserResponse);
  });

  it('should login a user', () => {
    const email = 'test@example.com';
    const password = 'password';

    service
      .login(email, password)
      .pipe(first())
      .subscribe((user) => {
        expect(user.username).toEqual(mockUserResponse.user.username);
      });

    const req = httpMock.expectOne('http://localhost:3000/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });

    req.flush(mockUserResponse);
  });

  it('should get user profile', () => {
    service
      .getProfile()
      .pipe(first())
      .subscribe((user) => {
        expect(user.username).toEqual(mockUserResponse.user.username);
      });

    const req = httpMock.expectOne('http://localhost:3000/api/user');
    expect(req.request.method).toBe('GET');

    req.flush(mockUserResponse);
  });
});
