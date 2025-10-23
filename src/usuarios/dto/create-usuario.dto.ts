import { IsString, IsEmail, MinLength, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString({ message: 'O nome de usuário deve ser um texto.' })
  usuario_nome: string;

  @ApiProperty({ example: 'joao.silva@example.com' })
  @IsEmail({}, { message: 'Por favor, forneça um e-mail válido.' })
  usuario_email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  usuario_senha: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString({}, { message: 'A data de nascimento deve estar no formato AAAA-MM-DD.' })
  usuario_dataDeNascimento: string;
}