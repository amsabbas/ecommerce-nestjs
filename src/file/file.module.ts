import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';

@Module({
imports: [],
  controllers: [FileController],
  providers: [],
  exports: [],
})
export class FileModule {}
