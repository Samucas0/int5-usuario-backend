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
   * Encontra um bibliotecário pelo seu número de identificação.
   * Retorna o bibliotecário se encontrado, ou null se não existir.
   */
  async findByNumero(numero: string): Promise<Bibliotecario | null> {
    return this.bibliotecariosRepository.findOne({ where: { numero } });
  }
}