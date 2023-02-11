import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
export class Curd {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  // @CreateDateColumn({ type: 'timestamp' })
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @OneToMany(() => Tags, (tags) => tags.curd)
  tags: Tags[];
}
