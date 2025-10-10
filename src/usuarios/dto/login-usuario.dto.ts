import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail({}, { message: 'Por favor, forneça um e-mail válido.' })
  usuario_email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  usuario_senha: string;
}