import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { BaseUser, User } from '@app/types';

interface UsersServiceInterface {
  create(user: unknown): Promise<BaseUser>;
  find(filterOptions?: FindManyOptions<User>): Promise<BaseUser[]>;
  findOne(option: FindOneOptions<BaseUser>): Promise<BaseUser>;
  update(
    option: FindOptionsWhere<User>,
    user: Partial<BaseUser>,
  ): Promise<boolean | BaseUser>;
  delete(option: FindOneOptions<User>): Promise<boolean | BaseUser>;
  setHashedRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean | BaseUser>;
  removeRefreshToken(userId: number): Promise<boolean>;
  checkEmailAvailability(email: string): Promise<boolean>;
  clearResetToken(userId: number): Promise<boolean>;
}

export { UsersServiceInterface };
