import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Token ausente');

    const [, token] = authHeader.split(' ');

    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      (request as any).user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
