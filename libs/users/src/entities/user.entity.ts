import { Exclude } from 'class-transformer';
import { BaseUser } from '@app/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
class UserEntity implements BaseUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: false })
  public email: string;

  @Column({ type: 'boolean', default: false })
  public isEmailConfirmed: boolean;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  public password: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  public passwordResetToken: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  public hashedRefreshToken: string;

  @Exclude()
  @CreateDateColumn()
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  public updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;
}

export { UserEntity };
