import { IsString, IsEmail, MinLength, IsDateString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'O nome de usuário deve ser um texto.' })
  usuario_nome: string;

  @IsEmail({}, { message: 'Por favor, forneça um e-mail válido.' })
  usuario_email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  usuario_senha: string;

  @IsDateString({}, { message: 'A data de nascimento deve estar no formato AAAA-MM-DD.' })
  usuario_dataDeNascimento: string;
}