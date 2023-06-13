import { Request, Response } from "express";
import { AppDataSource } from "../../../config/database/mysql-datasource.config";
import { Paciente } from "./paciente.entity";

export class PacienteController {
  public async create(req: Request, res: Response): Promise<any> {
    try {
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
}
