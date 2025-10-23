import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { BibliotecariosService } from './bibliotecarios.service';
import { LoginBibliotecarioDto } from './dto/login-bibliotecario.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class BibliotecariosController {
  constructor(private readonly bibliotecariosService: BibliotecariosService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login de um bibliotecário' })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido.' })
  @ApiResponse({ status: 401, description: 'Número de identificação inválido.' })
  async login(@Body() loginDto: LoginBibliotecarioDto) {
    const bibliotecario = await this.bibliotecariosService.findByNumero(
      loginDto.bibliotecario_numero,
    );

    if (!bibliotecario) {
      throw new HttpException('Número de identificação inválido', HttpStatus.UNAUTHORIZED);
    }

    return {
      message: 'Login de administrador bem-sucedido!',
      admin: bibliotecario,
    };
  }
}