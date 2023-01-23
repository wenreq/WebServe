/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-14 17:20:45
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-23 20:12:37
 * @FilePath: /WebServe/src/article/entities/article.entity.ts
 * @Description: 文章的实体类
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  Id: number;

  @Column({ type: 'varchar', length: 1255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 1255 })
  cover_img: string;

  @CreateDateColumn({ type: 'timestamp' })
  pub_date: Date;

  @Column({ type: 'varchar', length: 1255 })
  state: string;

  @Column({ type: 'tinyint' })
  is_delete: number;

  @Column({ type: 'int' })
  cate_id: number;

  @Column({ type: 'int' })
  author_id: number;

  @Generated('uuid')
  uuid: string;
}
