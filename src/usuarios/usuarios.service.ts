import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  // Função para criar um novo usuário (cadastro)
  async create(data: Partial<Usuario>): Promise<Usuario> {
    const { usuario_email } = data;
    if (!usuario_email) {
      throw new BadRequestException('O e-mail do usuário é obrigatório.');
    }
    const usuarioExistente = await this.findOneByEmail(usuario_email);

    if (usuarioExistente) {
      throw new BadRequestException('Este e-mail já está em uso.');
    }

    // NOTA: Em um projeto real, a senha seria criptografada aqui antes de salvar!
    // Ex: data.senha = await bcrypt.hash(data.senha, 10);

    const novoUsuario = this.usuariosRepository.create(data);
    return this.usuariosRepository.save(novoUsuario);
  }

  // Função para encontrar um usuário pelo e-mail (usado no login)
  async findOneByEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.usuariosRepository.findOne({ where: { usuario_email: email } });
    return usuario ?? undefined;
  }
}