import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('cadastro')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
    @Get('me')
  getMe(@Req() req: any) {
    return this.usersService.findByEmail(req.user.email)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteMe(@Req() req: any) {
    return this.usersService.deleteMe(req.user.id)
  }
}
