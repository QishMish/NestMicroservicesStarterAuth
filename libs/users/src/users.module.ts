import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { USERS_SERVICE } from './constants';
import { UsersService } from './users.service';
import { UserEntity } from './entities';
import { UtilsLibModule } from '@app/utils';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UtilsLibModule],
  providers: [
    UsersRepository,
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
  ],
  exports: [USERS_SERVICE],
})
export class UsersLibModule {}
