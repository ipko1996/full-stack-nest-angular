import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UserDtoSchema = z.object({
  username: z.string().min(2).max(30),
  password: z.string().min(2).max(30),
});

export class UserDto extends createZodDto(UserDtoSchema) {}
