import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Procedimento } from '../procedimento/procedimento.entity';
import { Consulta } from '../consulta/consulta.entity';

@Entity('consulta_procedimento')
export class ConsultaProcedimento {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() =>  Consulta, { eager: true })
  @JoinColumn({
    name: 'consulta_id',
    referencedColumnName: 'id'
  })
  consulta!: Consulta;

  @ManyToOne(() =>  Procedimento, { eager: true })
  @JoinColumn({
    name: 'procedimento_id',
    referencedColumnName: 'id'
  })
  procedimento!: Procedimento;

  @IsNotEmpty({
    message: 'A propriedade não pode ser vazia!'
  })
  @IsNumber()
  @Column()
  dente!: number;

  @IsNotEmpty({
    message: 'A propriedade não pode ser vazia!'
  })
  @IsNumber()
  @Column()
  quantidade!: number;

  @IsNotEmpty({
    message: 'A propriedade não pode ser vazia!'
  })
  @IsNumber()
  @Column({type: 'decimal', transformer: {
    to(value:any) {return value},
    from(value: any) {return parseFloat(value)}
  }})
  valor!: number;
}