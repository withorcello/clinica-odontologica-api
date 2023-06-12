import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("paciente")
export class Paciente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  cpf!: string;

  @Column("date")
  data_nascimento!: Date;

  @Column()
  sexo!: "F" | "M";

  @Column()
  endereco!: string;

  @Column()
  celular!: string;

  @Column()
  email!: string;
}
