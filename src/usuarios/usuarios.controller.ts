import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';

@Controller('usuarios') // Prefixo da rota: /usuarios
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('cadastro') // Rota: POST /usuarios/cadastro
  async cadastrar(@Body() dadosCadastro: any) {
    try {
      // NOTA: Em um projeto real, usaríamos DTOs (Data Transfer Objects) para validar os dados do body.
      const usuario = await this.usuariosService.create(dadosCadastro);
      // Omitir a senha da resposta
      const { usuario_senha, ...result } = usuario;
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login') // Rota: POST /usuarios/login
  async login(@Body() dadosLogin: any) {
    const { email, senha } = dadosLogin;
    const usuario = await this.usuariosService.findOneByEmail(email);

    if (!usuario) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    // NOTA: Em um projeto real, a senha seria comparada com a versão criptografada.
    // Ex: const senhaValida = await bcrypt.compare(senha, usuario.senha);
    const senhaValida = senha === usuario.usuario_senha;

    if (!senhaValida) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    // Lógica de login bem-sucedida (gerar token JWT, etc.)
    // Por agora, vamos apenas retornar o usuário sem a senha.
    const { usuario_senha: _, ...result } = usuario;
    return {
      message: 'Login bem-sucedido!',
      usuario: result,
      // Em um projeto real, aqui retornaria um token de acesso (access_token)
    };
  }
}