import { Column, PrimaryColumn } from 'typeorm';
import { BaseEntityInterface } from '@app/types';

abstract class BaseEntity implements BaseEntityInterface {
  @Column()
  @PrimaryColumn()
  readonly id: number;
}

export { BaseEntity };
