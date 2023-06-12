import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agenda')
export class Agenda {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tipo!: string;

  @Column()
  hora!: string;

  @Column()
  data!: string;

  @Column()
  dentista_id!: number;

  @Column()
  paciente_id!: number;
}