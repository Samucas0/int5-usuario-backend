import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'usuario' }) // Nome da tabela
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'usuario_id' })
  usuario_id: number;

  @Column({ name: 'usuario_nome' })
  usuario_nome: string;

  @Column({ name: 'usuario_email', unique: true })
  usuario_email: string;

  @Column({ name: 'usuario_senha' })
  usuario_senha: string;

  @Column({ name: 'usuario_dataDeNascimento' })
  usuario_dataDeNascimento: Date; 

}