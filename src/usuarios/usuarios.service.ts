import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { usuario_email } = createUsuarioDto;

    const usuarioExistente = await this.findOneByEmail(usuario_email);
    if (usuarioExistente) {
      throw new BadRequestException('Este e-mail já está em uso.');
    }
    
    const novoUsuario = this.usuariosRepository.create(createUsuarioDto);
    return this.usuariosRepository.save(novoUsuario);
  }

  async findOneByEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { usuario_email: email } });
  }

  async validateUser(email: string, pass: string): Promise<Usuario | null> {
    const usuario = await this.findOneByEmail(email);

    if (usuario && usuario.usuario_senha === pass) {
      return usuario;
    }
    return null;
  }
}