import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // Importa a entidade para este módulo
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}