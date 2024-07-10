import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
