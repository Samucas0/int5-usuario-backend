import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  usuario_id: number;

  @Column()
  usuario_nome: string;

  @Column({ unique: true }) // O e-mail deve ser único
  usuario_email: string;

  @Column()
  usuario_senha: string;

  @Column()
  usuario_dataDeNascimento: Date;

  // Campos do perfil que podemos adicionar agora
  @Column({ nullable: true }) // nullable: true significa que o campo não é obrigatório
  telefone: string;

  @Column({ nullable: true })
  endereco: string;
}