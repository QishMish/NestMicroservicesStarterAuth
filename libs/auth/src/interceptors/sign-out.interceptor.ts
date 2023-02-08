import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response as ExpressResponse } from 'express';
import { AuthServiceInterface } from '../interfaces';
import { AUTH_SERVICE } from '../constants';

@Injectable()
export class SignOutResponseInterceptor implements NestInterceptor {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ExpressResponse> {
    const response: ExpressResponse = context.switchToHttp().getResponse();

    response.setHeader('Set-Cookie', this.authService.generateLogOutCookie());

    return next.handle();
  }
}
