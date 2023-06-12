import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Procedimento } from './procedimento.entity';

export class ProcedimentoController {
  public async list(req: Request, res: Response) {

    const procedimento =  await AppDataSource.manager.find(Procedimento)

    res.status(200).json({ dados: procedimento, total: procedimento.length});
  }

  public async create(req: Request, res: Response) {

    let nome = req.body.nome;
    let materiais = req.body.materiais;
    let valor = req.body.valor;

    let proc = new Procedimento();
    proc.nome = nome;
    proc.materiais = materiais;
    proc.valor = valor;

    const procedimento_salvo = await AppDataSource.manager.save(proc);

    res.status(201).json({procedimento_salvo});
  }

  public async update(req: Request, res: Response){
  
    const { codigo } = req.params;
    // const cod = req.params.codigo;

    // return res.json({ update: true , codigo_enviado: codigo});

    const procedimento = await AppDataSource.manager.findOneBy(Procedimento, { id: codigo });

    if(procedimento == null) {
      return res.status(404).json({ erro: 'Procedimento não encontrado!' });
    }

    let { nome, materiais, valor} = req.body;

    procedimento.nome = nome;
    procedimento.materiais = materiais;
    procedimento.valor = valor;

    const procedimento_salvo = await AppDataSource.manager.save(procedimento);

    return res.json(procedimento_salvo);
  }

  public async destroy(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const procedimento = await AppDataSource.manager.findOneBy(Procedimento, { id: codigo });

    if(procedimento == null) {
      return res.status(404).json({ erro: 'Procedimento não encontrado!' });
    }

    await AppDataSource.manager.delete(Procedimento, procedimento);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const procedimento = await AppDataSource.manager.findOneBy(Procedimento, { id: codigo });

    if(procedimento == null) {
      return res.status(404).json({ erro: 'Procedimento não encontrado!' });
    }

    return res.json(procedimento);
  }
}
