import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { BibliotecariosModule } from './bibliotecarios/bibliotecarios.module'; // 1. IMPORTE AQUI
import { Bibliotecario } from './bibliotecarios/entities/bibliotecario.entity'; // 2. IMPORTE AQUI

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Usuario, Bibliotecario], // 3. ADICIONE A ENTIDADE AQUI
        synchronize: false,
        logging: true,
      }),
    }),
    UsuariosModule,
    BibliotecariosModule, // 4. ADICIONE O MÓDULO AQUI
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}