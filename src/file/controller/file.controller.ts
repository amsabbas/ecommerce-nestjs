import {
    Controller,
    Get,
    Param, Post, UseGuards,
    UseInterceptors,
    UploadedFile,
    Res,
    Headers
  } from "@nestjs/common";

import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller('file')
export class FileController {
    constructor() {}
  
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin)
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploads/',
            filename: (_, file, cb) => {
              const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
              cb(null, `${randomName}${extname(file.originalname)}`)
          }
        }),
        }),
      )
    uploadFile(@Headers() headers,@UploadedFile() file) {
        const fileReponse = {
          filename:  headers.host +"/file/image/" + file.filename,
        };
        return fileReponse;
      }

    @Get('image/:path') 
    seeUploadedFile(@Param('path') image, @Res() res) { 
      return res.sendFile(image, { root: './uploads' }); 
    }
}
  