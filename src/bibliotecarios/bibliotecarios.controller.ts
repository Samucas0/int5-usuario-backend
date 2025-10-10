import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { BibliotecariosService } from './bibliotecarios.service';
import { LoginBibliotecarioDto } from './dto/login-bibliotecario.dto';

@Controller('admin') // Rota continua /admin
export class BibliotecariosController {
  constructor(private readonly bibliotecariosService: BibliotecariosService) {}

  @Post('login') // Rota final: POST /admin/login
  async login(@Body() loginDto: LoginBibliotecarioDto) {
    const bibliotecario = await this.bibliotecariosService.findByNumero(
      loginDto.bibliotecario_numero,
    );

    if (!bibliotecario) {
      // Se não encontrou, o número é inválido
      throw new HttpException('Número de identificação inválido', HttpStatus.UNAUTHORIZED);
    }

    // Se encontrou, o login é bem-sucedido
    return {
      message: 'Login de administrador bem-sucedido!',
      admin: bibliotecario,
    };
  }
}