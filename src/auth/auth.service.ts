import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if(!user) return null;

     const validPassword = await bcrypt.compare(pass, user.password);
    if (!validPassword) return null;

    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
  sub: user.id,  
  email: user.email,
  role: user.role,
};
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d'}),
      user,
    };
  }
}
