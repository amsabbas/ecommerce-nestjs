import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../model/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { EditUser } from "../model/edit.user.entity";
import { PageOptionsDto } from "src/base/pagination/page.options.dto";
import { PageDto } from "src/base/pagination/page.dto";
import { PageMetaDto } from "src/base/pagination/page.meta.dto";
import { Constants } from "src/base/model/constants";

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

    const u = User.removePassword(user) as User
    if (!u) {
      throw new NotFoundException();
    }
    return u;
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

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected > 0
  }


  async updateUser(id: number, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where:{id:id}
    });

    user.password = pass
    return await this.usersRepository.save(user);
  }

  async edit(id: number,newUser: EditUser): Promise<boolean> {

    const user = await this.usersRepository.findOne({
      where:{id:id}
    });

    if (!user){
      throw new BadRequestException([
        'email not found.',
      ])
    }

    if (newUser.phone != null){
      user.phone = newUser.phone
    }
    if (newUser.name != null){
      user.name = newUser.name
    }
    const edited = await this.usersRepository.save(user);
    return edited.id != null
  }

   async getUsers(
    userId:number,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {

    const user = await this.usersRepository.findOne({
      where:{id:userId}
    });
   
    if (user.role == Constants.userNormal) {
      throw new BadRequestException([
        'admin only can get users',
      ]);
    }

    const queryBuilder = this.usersRepository.createQueryBuilder("Users");
    queryBuilder
      //.orderBy("users.created_at", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
  
}
