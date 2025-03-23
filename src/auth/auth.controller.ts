import { Controller, Post, Body, Get, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto, LoginDto } from './dto/auth.dto';  
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {  
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {  
    return this.authService.login(body.username, body.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    console.log('Controller - Request User:', req.user);  
    return req.user;
  }
}
