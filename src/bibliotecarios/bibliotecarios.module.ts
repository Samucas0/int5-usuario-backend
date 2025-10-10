import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecariosService } from './bibliotecarios.service';
import { BibliotecariosController } from './bibliotecarios.controller';
import { Bibliotecario } from './entities/bibliotecario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bibliotecario])],
  controllers: [BibliotecariosController],
  providers: [BibliotecariosService],
})
export class BibliotecariosModule {}