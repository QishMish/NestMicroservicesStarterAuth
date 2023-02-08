import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Repository,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityRepositoryInterface } from './entity.repository.interface';

@Injectable()
export abstract class EntityRepository<T extends ObjectLiteral>
  implements EntityRepositoryInterface<T>
{
  constructor(protected readonly entityRepository: Repository<T>) {}

  create(entity: unknown): Promise<T> {
    const createdEntity = this.entityRepository.create(entity as T);
    return this.entityRepository.save(createdEntity);
  }

  find(filterOptions?: FindManyOptions<T>): Promise<T[]> {
    return this.entityRepository.find(filterOptions);
  }

  findOne(option: FindOneOptions<T>): Promise<T> {
    return this.entityRepository.findOne(option);
  }

  update(
    option: FindOptionsWhere<T>,
    entity: QueryDeepPartialEntity<T>,
  ): Promise<boolean | T> {
    return this.entityRepository
      .update(option, entity)
      .then((result) => !!result.affected);
  }

  delete(option: FindOneOptions<T>): Promise<boolean | T> {
    return this.findOne(option).then((result) => {
      if (!result) throw new BadRequestException();
      return this.entityRepository.softRemove(result);
    });
  }
}
