import {
    Controller,
    Get,
  } from "@nestjs/common";
import { AppInfo } from "../model/app.info.entity";
import { ConfigService } from "../service/config.service";


@Controller('config')
export class ConfiController {
    constructor(private readonly configService: ConfigService
    ) {}
  
  
    @Get('appInfo')
    appInfo(): Promise<AppInfo> {
      return this.configService.appInfo();
    }
}
  