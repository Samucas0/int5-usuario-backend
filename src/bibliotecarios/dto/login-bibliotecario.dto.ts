import { IsString, IsNotEmpty } from 'class-validator';

export class LoginBibliotecarioDto {
  @IsString()
  @IsNotEmpty({ message: 'O número de identificação é obrigatório.' })
  bibliotecario_numero: string;
}