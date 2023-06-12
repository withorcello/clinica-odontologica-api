import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('procedimento')
export class Procedimento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  materiais!: string;

  @Column({type: 'decimal', transformer: {
    to(value:any) {return value},
    from(value: any) {return parseFloat(value)}
  }})
  valor!: number;
}