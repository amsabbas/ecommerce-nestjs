import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../model/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { EditUser } from "../model/edit.user.entity";
import { PageOptionsDto } from "src/base/pagination/page.options.dto";
import { PageDto } from "src/base/pagination/page.dto";
import { PageMetaDto } from "src/base/pagination/page.meta.dto";
import { UserToken } from "../model/user.token.entity";
import { I18nContext, I18nService } from 'nestjs-i18n';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserToken)
    private usersTokenRepository: Repository<UserToken>,
    private readonly i18n: I18nService
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
    const user = await this.usersRepository.findOne({ where: { email:email },});

      if (!user){
        throw new BadRequestException([
          this.i18n.t('language.email_not_found', { lang: I18nContext.current().lang })
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
        this.i18n.t('language.register_account_exists', { lang: I18nContext.current().lang })
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
        this.i18n.t('language.email_not_found', { lang: I18nContext.current().lang })
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
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {

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
  
  async updateFcmToken(userID: number,token: string): Promise<any> {
  
    var userToken = await this.usersTokenRepository.findOne({
      where: {user_id:userID}
    })
    
    if (!userToken){
      userToken = new UserToken();   
    }
    userToken.user_id = userID;
    userToken.token = token;

    return this.usersTokenRepository.save(userToken);
  }

  async logout(userID: number): Promise<boolean> {
   const result =  await this.usersTokenRepository.delete({
      user_id : userID
    });
    return result.affected > 0;
  }

  async findTokenById(id: number): Promise<string> {
    const user = await this.usersTokenRepository.findOne({
      where:{user_id:id}
    });
    return user.token;
  }


}
