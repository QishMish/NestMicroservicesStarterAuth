import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { User, BaseUser } from '@app/types';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { UsersServiceInterface } from './interfaces';
import { CryptoService } from '@app/utils';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  public create(user: User): Promise<BaseUser> {
    return this.usersRepository.create(user);
  }

  public find(filterOptions?: FindManyOptions<User>): Promise<BaseUser[]> {
    return this.usersRepository.find(filterOptions);
  }

  public findOne(option: FindOneOptions<User>): Promise<BaseUser> {
    return this.usersRepository.findOne(option);
  }

  public update(
    option: FindOptionsWhere<User>,
    user: Partial<User>,
  ): Promise<boolean | BaseUser> {
    return this.usersRepository.update(option, user);
  }

  public delete(option: FindOneOptions<User>): Promise<boolean | BaseUser> {
    return this.usersRepository.delete(option);
  }

  public async setHashedRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean | BaseUser> {
    const hashedRefreshToken = await this.cryptoService.hash(refreshToken);

    return this.usersRepository.setHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );
  }

  public removeRefreshToken(userId: number): Promise<boolean> {
    return this.usersRepository.removeRefreshToken(userId);
  }

  public checkEmailAvailability(email: string): Promise<boolean> {
    return this.usersRepository.checkEmailAvailability(email);
  }

  public clearResetToken(userId: number): Promise<boolean> {
    return this.clearResetToken(userId);
  }
}
