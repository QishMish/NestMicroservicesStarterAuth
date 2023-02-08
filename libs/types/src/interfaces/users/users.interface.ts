import { BaseEntity } from '@app/database';

interface User {
  name: string;
  email: string;
  password: string;
}

interface BaseUser extends BaseEntity {
  name: string;
  email: string;
  isEmailConfirmed: boolean;
  password: string;
  passwordResetToken?: string;
  hashedRefreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { User, BaseUser };
