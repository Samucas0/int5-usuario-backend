import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'bibliotecario' })
export class Bibliotecario {
  @PrimaryGeneratedColumn({ name: 'bibliotecario_id' })
  id: number;

  @Column({ name: 'bibliotecario_numero', unique: true })
  numero: string;
}