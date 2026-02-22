import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto{
@IsEmail({}, {message: 'Credenciais inválidas'})
email: string

@IsString()
@MinLength(8, { message: 'Credenciais inválidas'})
password: string
}