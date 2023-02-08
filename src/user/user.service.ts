import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// 引入 User 实体
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 注册
  async register(createUserDto: CreateUserDto) {
    // 从参数对象中将名字解构出来
    const username = createUserDto.username;
    // 根据名字从数组库中查询
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    // 查到如果有数据，则抛出用户名已存在的异常信息
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    // 没有查到，则将数据插入到数据库中
    // 相当于 new User(createUser) 只是创建了一个新的用户对象，save 方法才是执行插入数据。
    const newUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
    // 2. 隐藏 password 字段
    // await this.user.save(newUser);
    // return await this.user.findOne({ where: { username } });
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id) {
    return await this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
