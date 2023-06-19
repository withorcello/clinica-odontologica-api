import { IsDate, IsDecimal, IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Agenda } from "../agenda/agenda.entity";
import { Dentista } from "../dentista/dentista.entity";
import { Paciente } from "../paciente/paciente.entity";

@Entity("consulta")
export class Consulta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("date")
  @IsDate()
  @IsNotEmpty()
  data!: Date;

  @Column()
  @IsDecimal()
  @IsNotEmpty()
  valor_total!: number;

  @IsNotEmpty({ message: "A agenda deve ser informada!" })
  @JoinColumn({ name: "agenda_id" })
  @ManyToOne(() => Agenda, { eager: true })
  agenda!: Agenda;

  @IsNotEmpty({ message: "O dentista deve ser informado!" })
  @JoinColumn({ name: "dentista_id" })
  @ManyToOne(() => Dentista, { eager: true })
  dentista!: Dentista;

  @IsNotEmpty({ message: "O paciente deve ser informado!" })
  @JoinColumn({ name: "paciente_id" })
  @ManyToOne(() => Paciente, { eager: true })
  paciente!: Paciente;
}
