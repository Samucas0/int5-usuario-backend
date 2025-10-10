import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('cadastro')
  async cadastrar(@Body() dadosCadastro: any) {
    try {
      const usuario = await this.usuariosService.create(dadosCadastro);
      const { usuario_senha, ...result } = usuario;
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() dadosLogin: any) {
    const { email, senha } = dadosLogin;
    const usuario = await this.usuariosService.findOneByEmail(email);

    if (!usuario || senha !== usuario.usuario_senha) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    const { usuario_senha: _, ...result } = usuario;
    return {
      message: 'Login bem-sucedido!',
      usuario: result,
    };
  }
}