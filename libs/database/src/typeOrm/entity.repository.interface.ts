import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

interface EntityRepositoryInterface<T extends ObjectLiteral> {
  create(entity: unknown): Promise<T>;
  find(filterOptions: FindManyOptions<T>): Promise<T[]>;
  findOne(option: FindOneOptions<T>): Promise<T>;
  update(
    option: FindOptionsWhere<T>,
    entity: QueryDeepPartialEntity<T>,
  ): Promise<boolean | T>;
  delete(option: FindOneOptions<T>): Promise<boolean | T>;
}

export { EntityRepositoryInterface };
