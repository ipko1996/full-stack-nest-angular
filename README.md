# Summary

User Authentication application:
    Implement user authentication using JWT
    Allow users to register, login, and logout.
    Include validation for user inputs (e.g., username, password).
    UI pages:
        User registration form
        User login
        After successful login, dashboard with a welcome message and list of all registered user
        Log out page
    Extra: RBAC with two roles. Only Admin will see registered users on dashboard

# Tech
Stack:

    Nest.js
    Typescript
    Angular 14+
    mongodb

# How to run the project

Each service has its own `README.md` file with instructions on how to run the project. The following is a list of services and their respective `README.md` files:

# API
[API README.md](./api/README.md)

## API Featurees

- [x] Add documentation
  - [x] Add API documentation
  - [ ] Add how to run the project
  - [x] Add endpoints documentation
  - [x] Swagger could be added too
    - [?] Add swagger documentation to all endpoints
- [x] Add logging with pino for example

## API Endpoints

| Method | API Endpoint      | Access     | Description                           |
|--------|-------------------|------------|---------------------------------------|
| GET    | /api              | PUBLIC     | Swagger                               |
| POST   | /auth/register    | PUBLIC     | Create a new user account             |
| POST   | /auth/login       | PUBLIC     | Sign in an existing user              |
| GET    | /auth/logout      | PROTECTED  | Log out an existing user              |
| GET    | /auth/refresh     | PROTECTED  | Refresh auth tokens                   |
| POST   | /users/register   | PROTECTED  | Create a new user account             |
| GET    | /users            | PUBLIC     | Fetch all users                       |
| GET    | /users/:username  | PUBLIC     | Fetch a single user                   |
| DELETE | /users/:id        | PROTECTED  | Deletes a user from database          |


# Client
[Client README.md](./client/README.md)

## Pages

| Route       | Description          | Access    |
|-------------|----------------------|-----------|
| /           | Userspage            | PROTECTED |
| /auth       | Login/Register page  | PUBLIC    |
| /logout     | Logout page          | PUBLIC    |

## Client Featurees

- [x] Add documentation
- [x] Add AuthGuard
- [x] Add TokenInterceptor
- [x] User Login
- [x] User Registration
- [x] List User

- [x] Some unit tests


## Would be nice to add later

- [ ] RBAC support
- [ ] Add i18n support
- [ ] Add Docker support
- [ ] NgRx
- [ ] Add tests
- [ ] Add CI/CD

## Known issues
