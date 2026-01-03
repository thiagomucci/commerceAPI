import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto  } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const emailExist = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if(emailExist){
      throw new ConflictException('Email inválido')};

    const hashedPassword = await bcrypt.hash(dto.password, 10);

      return 'Conta criada com sucesso'
  }

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {email: dto.email}
    });

    if(!user) {
      throw new UnauthorizedException('Credenciais inválidos');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password)

    if(!passwordMatches){
      throw new UnauthorizedException('Credenciais inválidos');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async getMe(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
        deleteTime: null
      },
      select: {
        id: true,
        name: true,
        email: true,
        createTime: true
      },
    });

    if(!user){
      throw new NotFoundException('Usuario não encontrado');
    }

    return user
  }

  async deleteMe(id: string) {
     const user = await this.prisma.user.findFirst({
      where: {
        id: id,
        deleteTime: null,
      },
    });

    if(!user) {
      throw new NotFoundException('Usuario não encontrado')
    }

    await this.prisma.user.update({
      where: { id: id },
      data: { deleteTime: new Date() },
    });

    return { message: 'Conta excluida' }
  }
}
