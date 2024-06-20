import { Module } from '@nestjs/common';

import { ConfiController } from './controller/config.controller';
import { ConfigService } from './service/config.service';


@Module({
imports: [],
  controllers: [ConfiController],
  providers: [ConfigService],
})
export class ConfigurationModule {}
