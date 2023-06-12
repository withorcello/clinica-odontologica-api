import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consulta_procedimento')
export class ConsultaProcedimento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  consulta_id!: number;

  @Column()
  procedimento_id!: number;

  @Column()
  dente!: number;

  @Column()
  quantidade!: number;

  @Column({type: 'decimal', transformer: {
    to(value:any) {return value},
    from(value: any) {return parseFloat(value)}
  }})
  valor!: number;
}