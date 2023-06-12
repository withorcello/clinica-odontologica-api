import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dentista')
export class Dentista {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cpf!: string;

  @Column()
  rg!: string;

  @Column()
  nome!: string;

  @Column()
  numero_registro!: string;

  @Column()
  especialidade!: string;

  @Column()
  celular!: string;
}