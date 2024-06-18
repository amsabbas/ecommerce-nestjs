import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../model/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where:{id:id}
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({    where: { email:email },
    }
    );

      if (!user){
        throw new BadRequestException([
          'email not exist.',
        ])
      }
      
    return user;
  }
  async create(user: User): Promise<User> {
    const count = await this.usersRepository.count();
    user.password = await UserService.hashPassword(user.password);
    const exist = await this.usersRepository.findOne({where : {
       email: user.email,
    }});
    if (exist) {
      throw new BadRequestException([
        'Account with this email already exists.',
      ]);
    }
  
    const inserted = await this.usersRepository.save(user);
    delete inserted.password;
    return this.findById(inserted.id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  
}
