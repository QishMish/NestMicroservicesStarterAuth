import { SetMetadata } from '@nestjs/common';
import { Role } from '@app/types';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
