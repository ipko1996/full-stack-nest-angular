import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Register user with role?
  // For now if you want to add ADMIN you can do it in the database
  async register(username: string, password: string, returnTokens = true) {
    this.logger.debug(`Registering user with username: ${username}`);
    const hashedPassword = await hash(password, 10);

    const newUser = await this.userService.create({
      username,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = await this.getTokens(
      username,
      newUser.id,
    );

    if (returnTokens) {
      await this.updateRefreshToken(newUser.id, refreshToken);
      return {
        username,
        id: newUser.id,
        accessToken,
        refreshToken,
      };
    }

    this.logger.debug(`User created successfully with username: ${username}`);
    return {
      message: 'User created successfully',
    };
  }

  async login(username: string, password: string) {
    this.logger.debug(`Logging in user with username: ${username}`);
    const existingUser = await this.userService.findByUsername(username);
    if (!existingUser) {
      throw new BadRequestException('Invalid credentials');
    }
    const passwordMatch = await compare(password, existingUser.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.getTokens(
      username,
      existingUser.id,
    );

    await this.updateRefreshToken(existingUser.id, refreshToken);

    this.logger.debug(`User logged in successfully with username: ${username}`);
    return {
      username,
      id: existingUser.id,
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string) {
    this.logger.debug(`Logging out user with id: ${userId}`);
    return this.userService.update(userId, { refreshToken: null });
  }

  async refreshTokens(userId: string, oldRefreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException();
    }

    if (oldRefreshToken !== user.refreshToken) {
      this.logger.warn('Someone tried to use an invalid refresh token.');
      throw new ForbiddenException();
    }

    const tokens = await this.getTokens(user.username, user.id);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return {
      username: user.username,
      id: user.id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    // Could hash the refresh token here
    this.logger.debug(`Updating refresh token for user with id: ${userId}`);
    this.userService.update(userId, {
      refreshToken,
    });
  }

  async getTokens(username: string, userId: string) {
    const payload = { username, sub: userId };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '24h', // Just for showing that the refresh token works
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
