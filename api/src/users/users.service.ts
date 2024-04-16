import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    this.logger.debug(
      `Creating user manually with username: ${createUserDto.username}`,
    );
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: this.prismaExclude('User', ['password', 'refreshToken']),
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findById(sub: string) {
    return this.prisma.user.findUnique({
      where: {
        id: sub,
      },
    });
  }

  async update(userId: string, updateUserDto: Prisma.UserUpdateInput) {
    this.logger.debug(`Updating user with id: ${userId}`);
    return this.prisma.user.update({
      data: updateUserDto,
      where: {
        id: userId,
      },
      select: this.prismaExclude('User', ['password']),
    });
  }

  async remove(userId: string) {
    this.logger.debug(`Deleting user with id: ${userId}`);
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
      select: this.prismaExclude('User', ['password']),
    });
  }

  // Kudos to https://stackoverflow.com/a/77410374/24077129
  prismaExclude<T extends Entity, K extends Keys<T>>(type: T, omit: K[]) {
    type Key = Exclude<Keys<T>, K>;
    type TMap = Record<Key, true>;
    const result: TMap = {} as TMap;
    for (const key in Prisma[`${type}ScalarFieldEnum`]) {
      if (!omit.includes(key as K)) {
        result[key as Key] = true;
      }
    }
    return result;
  }
}
