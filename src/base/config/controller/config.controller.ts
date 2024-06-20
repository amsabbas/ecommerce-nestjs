import {
    Controller,
    Get,
  } from "@nestjs/common";
import { Config } from "../model/config.entity";
import { ConfigService } from "../service/config.service";


@Controller('config')
export class ConfiController {
    constructor(private readonly configService: ConfigService
    ) {}
  
  
    @Get('contacts')
    getContacts(): Promise<Config> {
      return this.configService.getContacts();
    }
}
  