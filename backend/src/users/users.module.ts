import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './user.repository';
@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
