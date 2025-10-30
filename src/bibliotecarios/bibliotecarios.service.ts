// src/bibliotecarios/bibliotecarios.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bibliotecario } from './entities/bibliotecario.entity';

@Injectable()
export class BibliotecariosService {
  constructor(
    @InjectRepository(Bibliotecario)
    private bibliotecariosRepository: Repository<Bibliotecario>,
  ) {}

  /**
   * Valida o login de um bibliotecário pelo login e senha.
   * Retorna o bibliotecário se bater, ou null se não.
   */
  async validateLogin(
    loginFornecido: string,
    senhaFornecida: string,
  ): Promise<Bibliotecario | null> {
    
    // Procura no banco onde 'login' E 'senha' batem
    const bibliotecario = await this.bibliotecariosRepository.findOne({
      where: {
        login: loginFornecido, // Usando a propriedade 'login' da entidade
        senha: senhaFornecida, // Usando a propriedade 'senha' da entidade
      },
    });

    return bibliotecario;
  }
}