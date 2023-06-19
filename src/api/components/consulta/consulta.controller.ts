import { Request, Response } from "express";
import { AppDataSource } from "../../../config/database/mysql-datasource.config";
import { Consulta } from "./consulta.entity";
import { Between, In } from "typeorm";
import { validate } from "class-validator";

export class ConsultaController {
  public async create(req: Request, res: Response): Promise<any> {
    try {
      const consulta = AppDataSource.manager.create(Consulta, req.body);

      const error = await validate(consulta);
      if (error.length) return res.status(400).json(error);

      await consulta.save();

      return res.status(201).json("Consulta cadastrada com sucesso!");
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async findOne(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id da consulta não informado!");

      const consulta = await AppDataSource.manager.findOneBy(Consulta, {
        id: +req.params.id,
      });

      return res.json(consulta);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async findAll(req: Request, res: Response): Promise<any> {
    try {
      const filtro = req.query as unknown as FiltroConsulta;
      const consultas = await AppDataSource.manager.find(Consulta, {
        where: {
          ...(filtro.dataInicio &&
            filtro.dataFim && {
              data: Between(filtro.dataInicio, filtro.dataFim),
            }),
          ...(filtro.status && { status: In(filtro.status) }),
        },
      });

      return res.json(consultas);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id da consulta não informado!");

      const consulta = await AppDataSource.manager.findOneBy(Consulta, {
        id: +req.params.id,
      });
      if (!consulta) throw new Error("Consulta não encontrada para alterar!");

      consulta.data = req.body.data;
      consulta.valor_total = req.body.valor_total;

      const error = await validate(consulta);
      if (error.length) return res.status(400).json(error);

      await AppDataSource.manager.save(consulta);

      return res.json("Consulta alterada com sucesso!");
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    try {
      if (!req.params.id) throw new Error("Id da consulta não informado!");

      const id = +req.params.id;
      await AppDataSource.manager.delete(Consulta, { id });

      return res.json("Consulta excluido com sucesso!");
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

interface FiltroConsulta {
  dataInicio: Date;
  dataFim: Date;
  status: Array<number>;
}
