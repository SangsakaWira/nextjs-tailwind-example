import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-strategy/auth.local.guards';
import { JwtAuthGuard } from './auth/jwt-strategy/auth.jwt.guards';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { Public } from './utils/utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
