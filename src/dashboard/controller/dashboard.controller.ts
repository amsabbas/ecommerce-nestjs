import {
    Controller,
    Get,  Request, UseGuards,
  } from "@nestjs/common";

import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';
import { DashboardService } from "../service/dashboard.service";
import { DashboardData } from "../model/dashboard.data";

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}
  
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('getData')
    @Roles(Role.Admin)
    getData(@Request() { user }: Req,): Promise<DashboardData> {
      return this.dashboardService.getData();
    }
  
}
  