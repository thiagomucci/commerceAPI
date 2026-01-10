import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {

    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) throw new Error('Credenciais inválidos');
    return this.authService.login(user);
  }
}
