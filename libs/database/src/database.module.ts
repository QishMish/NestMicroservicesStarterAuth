import { Module } from '@nestjs/common';
import { EntityRepository } from './typeOrm';

@Module({
  providers: [],
  exports: [EntityRepository],
})
export class DatabaseLibModule {}
