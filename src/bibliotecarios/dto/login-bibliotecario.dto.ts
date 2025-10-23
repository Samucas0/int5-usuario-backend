import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBibliotecarioDto {
  @ApiProperty({ example: '123456789' })
  @IsString()
  @IsNotEmpty({ message: 'O número de identificação é obrigatório.' })
  bibliotecario_numero: string;
}