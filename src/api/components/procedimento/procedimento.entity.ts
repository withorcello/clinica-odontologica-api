import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('procedimento')
export class Procedimento {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty({
    message: 'A propriedade não pode ser vazia!'
  })
  @IsString()
  @Column()
  nome!: string;

  @IsNotEmpty({
    message: 'A propriedade não pode ser vazia!'
  })
  @IsString()
  @Column()
  materiais!: string;

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