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

  async create(data: any): Promise<Usuario> {
    // Mapeando do front-end para a entidade
    const dadosParaSalvar = {
        usuario_nome: data.usuario,
        usuario_email: data.email,
        usuario_senha: data.senha,
        usuario_dataDeNascimento: data.dataNascimento,
    };

    const usuarioExistente = await this.findOneByEmail(dadosParaSalvar.usuario_email);

    if (usuarioExistente) {
      throw new BadRequestException('Este e-mail já está em uso.');
    }

    const novoUsuario = this.usuariosRepository.create(dadosParaSalvar);
    return this.usuariosRepository.save(novoUsuario);
  }

  async findOneByEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.usuariosRepository.findOne({ where: { usuario_email: email } });
    return usuario === null ? undefined : usuario;
  }
}