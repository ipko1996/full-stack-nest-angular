import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
// import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/decorators/roles/roles.decorator';
import { AccessContorlService } from 'src/shared/access-control.service';
import { UsersService } from 'src/users/users.service';

export interface TokenDto {
  id: number;
  role: Role;
}

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly logger = new Logger(RoleGuard.name);
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessContorlService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const userId = request['user'].userId;
    const userData = await this.userService.findById(userId);
    if (!userData) {
      return false;
    }

    this.logger.debug(`Required roles: ${requiredRoles}`);
    this.logger.debug(`User: ${userData.username} has role: ${userData.role}`);

    for (const role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole: userData.role,
      });

      if (result) {
        return true;
      }
    }

    return false;
  }
}

/**
 * Kudos to: https://medium.com/@dev.muhammet.ozen/role-based-access-control-in-nestjs-15c15090e47d
 */
