// src/bibliotecarios/bibliotecarios.controller.ts

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
  @ApiResponse({ status: 401, description: 'Login ou senha inválido.' }) // Mensagem atualizada
  async login(@Body() loginDto: LoginBibliotecarioDto) {
    
    // Chama o serviço de validação com 'login' e 'senha'
    const bibliotecario = await this.bibliotecariosService.validateLogin(
      loginDto.login,
      loginDto.senha,
    );

    if (!bibliotecario) {
      throw new HttpException(
        'Login ou senha inválido',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      message: 'Login de administrador bem-sucedido!',
      admin: bibliotecario, // Retorna os dados do admin (incluindo o nome)
    };
  }
}