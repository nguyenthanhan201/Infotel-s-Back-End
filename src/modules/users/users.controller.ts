import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('user')
@ApiTags('user')
// @UseGuards(AuthGuard('bearer'))
@UseGuards(AuthGuard)
export class UsersController {
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
