import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'bibliotecario' })
export class Bibliotecario {
  @PrimaryGeneratedColumn({ name: 'bibliotecario_id' })
  id: number;

  @Column({ name: 'bibliotecario_nome' })
  nome: string; 

  @Column({ name: 'bibliotecario_login', unique: true })
  login: string;

  @Column({ name: 'bibliotecario_senha' }) 
  senha: string; 
}