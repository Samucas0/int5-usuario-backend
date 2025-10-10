import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('cadastro')
  async cadastrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = await this.usuariosService.create(createUsuarioDto);
      const { usuario_senha, ...result } = usuario;
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    const usuario = await this.usuariosService.validateUser(
      loginUsuarioDto.usuario_email,
      loginUsuarioDto.usuario_senha,
    );

    if (!usuario) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    const { usuario_senha, ...result } = usuario;
    return {
      message: 'Login bem-sucedido!',
      usuario: result,
    };
  }
}