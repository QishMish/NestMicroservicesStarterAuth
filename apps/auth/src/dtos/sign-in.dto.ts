import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SignInUser } from '@app/types';

class SignInDto implements SignInUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export { SignInDto };
