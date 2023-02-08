import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository } from '@app/database';
import { BaseUser } from '@app/types';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';

@Injectable()
export class UsersRepository extends EntityRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {
    super(userEntity);
  }

  public setHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string,
  ): Promise<boolean | BaseUser> {
    return this.update(
      { id: userId },
      {
        hashedRefreshToken,
      },
    );
  }

  public removeRefreshToken(userId: number): Promise<boolean> {
    return this.update(
      { id: userId },
      {
        hashedRefreshToken: null,
      },
    ) as Promise<boolean>;
  }

  public confirmEmail(email: string): Promise<boolean> {
    return this.update(
      { email: email },
      {
        isEmailConfirmed: true,
      },
    ) as Promise<boolean>;
  }

  public checkEmailAvailability(email: string): Promise<boolean> {
    return this.findOne({
      where: {
        email,
      },
    }).then((result) => (result ? false : true));
  }

  public clearResetToken(userId: number): Promise<boolean> {
    return this.update(
      { id: userId },
      { passwordResetToken: null },
    ) as Promise<boolean>;
  }
}
