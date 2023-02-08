import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string; // 昵称

  @Exclude()
  @Column()
  // @Column({ select: false }) // 隐藏此列
  password: string; // 密码

  @Column()
  avatar: string; //头像

  @Column()
  email: string;

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string; // 用户角色

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    console.log(this.password, bcrypt);
    this.password = await bcrypt.hashSync(this.password);
  }
}

/*
  1. 在创建 User 实体, 使用 @PrimaryGeneratedColumn('uuid') 创建一个主列 id，该值将使用 uuid 自动生成。Uuid 是一个独特的字符串;
  2. 实现字段名驼峰转下划线命名, createTime 和 updateTime 字段转为下划线命名方式存入数据库， 只需要在 @Column 装饰器中指定 name 属性；
  3. 我们使用了装饰器 @BeforeInsert 来装饰 encryptPwd 方法，表示该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的。
  4. 给博客系统设置了三种角色 root、autor 和 visitor, root有所以权限，author有写文章权限，visitor只能阅读文章， 注册的用户默认是 visitor, root权限的账号可以修改用户角色。
*/
