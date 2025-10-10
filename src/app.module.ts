import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Especifica explicitamente o arquivo .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa o ConfigModule para dentro do TypeOrmModule
      inject: [ConfigService], // Injeta o serviço de configuração
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Usuario],
        synchronize: false, // Mantém a sincronização para desenvolvimento
        logging: true, // Adiciona logs para ver as queries do TypeORM no console
      }),
    }),
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}