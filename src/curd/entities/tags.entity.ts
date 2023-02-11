import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Curd } from './curd.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Curd)
  curd: Curd;
}
