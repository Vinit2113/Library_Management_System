import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum Role {
  admin = 'admin',
  user = 'user',
  librarian = 'librarian',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false, unique: true })
  username: string;

  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  phone: number;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.male })
  gender: Gender;

  @Column({ type: 'enum', enum: Role, default: Role.user })
  role: Role;
  Role: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated: Date;

  @Column({ type: 'tinyint', default: 1 })
  status: number;
}
