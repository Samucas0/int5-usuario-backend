import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { BibliotecariosModule } from './bibliotecarios/bibliotecarios.module';
import { Bibliotecario } from './bibliotecarios/entities/bibliotecario.entity'; 

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
        entities: [Usuario, Bibliotecario], 
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
    }),
    UsuariosModule,
    BibliotecariosModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}