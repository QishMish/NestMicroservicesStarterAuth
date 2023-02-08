import { Request } from 'express';
import { BaseUser } from '@app/types';

export interface RequestWithUser<T extends BaseUser> extends Request {
  user: T;
}
