// src/bibliotecarios/dto/login-bibliotecario.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBibliotecarioDto {
  @ApiProperty({ example: 'admin_biblio' }) // Trocado
  @IsString()
  @IsNotEmpty({ message: 'O login é obrigatório.' })
  login: string; // Trocado de 'bibliotecario_numero' para 'login'

  @ApiProperty({ example: 'senhaForte123' }) // Adicionado
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  senha: string; // Adicionado
}