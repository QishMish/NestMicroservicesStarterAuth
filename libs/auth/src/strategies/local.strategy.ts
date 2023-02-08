import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AUTH_SERVICE } from '../constants';
import { AuthServiceInterface } from '../interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authenticationService: AuthServiceInterface,
  ) {
    super({ usernameField: 'email' });
  }
  validate(email: string, password: string) {
    return this.authenticationService.getAuthorizedUser(email, password);
  }
}
