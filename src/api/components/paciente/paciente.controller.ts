import { Request, Response } from "express";
import { AppDataSource } from "../../../config/database/mysql-datasource.config";
import { Paciente } from "./paciente.entity";

export class PacienteController {
  public async create(req: Request, res: Response): Promise<any> {
    try {
      const { cpf, email } = req.body;
      if (cpf && !this.validarCpf(cpf)) {
        throw new Error("Número de CPF informado é inválido!");
      }
      if (email && !this.validarEmail(email)) {
        throw new Error("Email informado é inválido!");
      }

      await AppDataSource.manager.insert(Paciente, req.body);

      return res.json("Paciente cadastrado com sucesso!");
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  public async findOne(req: Request, res: Response): Promise<any> {
    try {
      const paciente = await AppDataSource.manager.findOneBy(Paciente, {
        id: +req.params.id,
      });

      return res.status(201).json(paciente);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  public async findAll(req: Request, res: Response): Promise<any> {
    try {
      const pacientes = await AppDataSource.manager.find(Paciente);

      return res.json(pacientes);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    try {
      const id = +req.params.id;
      const { cpf, email } = req.body;
      if (cpf && !this.validarCpf(cpf)) {
        throw new Error("Número de CPF informado é inválido!");
      }
      if (!email || !this.validarEmail(email)) {
        throw new Error("Email informado é inválido!");
      }

      await AppDataSource.manager.update(Paciente, { id }, req.body);

      return res.json("Paciente alterado com sucesso!");
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = +req.params.id;
      await AppDataSource.manager.delete(Paciente, { id });

      return res.json("Paciente excluido com sucesso!");
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  private validarCpf(cpf: string): boolean {
    const cpfLimpo = cpf.replace(/\D/g, "");

    if (cpfLimpo.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.charAt(10))) return false;

    return true;
  }

  private validarEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(String(email).toLowerCase());
  }
}
