import { IsDate, IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum SexoPaciente {
  Maculino = 1,
  Feminino,
}

@Entity("paciente")
export class Paciente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  cpf!: string;

  @Column("date")
  @IsDate()
  @IsNotEmpty()
  data_nascimento!: Date;

  @Column()
  @IsEnum(SexoPaciente)
  @IsNotEmpty()
  sexo!: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  endereco!: string;

  @Column()
  @IsPhoneNumber()
  @IsNotEmpty()
  celular!: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
