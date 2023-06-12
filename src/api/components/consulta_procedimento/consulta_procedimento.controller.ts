import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { ConsultaProcedimento } from './consulta_procedimento.entity';

export class ConsultaProcedimentoController {
  public async list(req: Request, res: Response) {

    const consultaProcedimento =  await AppDataSource.manager.find(ConsultaProcedimento)

    res.status(200).json({ dados: consultaProcedimento, total: consultaProcedimento.length });
  }

  public async create(req: Request, res: Response) {

    let consulta_id = req.body.consulta_id;
    let procedimento_id = req.body.procedimento_id;
    let dente = req.body.dente;
    let quantidade = req.body.quantidade;
    let valor = req.body.valor;

    let cp = new ConsultaProcedimento();
    cp.consulta_id = consulta_id;
    cp.procedimento_id = procedimento_id;
    cp.dente = dente;
    cp.quantidade = quantidade;
    cp.valor = valor;

    const consultaProcedimento_salva = await AppDataSource.manager.save(cp);

    res.status(201).json({consultaProcedimento_salva});
  }

  public async update(req: Request, res: Response){
  
    const { codigo } = req.params;
    // const cod = req.params.codigo;

    // return res.json({ update: true , codigo_enviado: codigo});

    const consultaProcedimento = await AppDataSource.manager.findOneBy(ConsultaProcedimento, { id: codigo });

    if(consultaProcedimento == null) {
      return res.status(404).json({ erro: 'Consulta Procedimento não encontrado!' });
    }

    let { consulta_id, procedimento_id, dente, quantidade, valor} = req.body;

    consultaProcedimento.consulta_id = consulta_id;
    consultaProcedimento.procedimento_id = procedimento_id;
    consultaProcedimento.dente = dente;
    consultaProcedimento.quantidade = quantidade;
    consultaProcedimento.valor = valor;

    const consultaProcedimento_salvo = await AppDataSource.manager.save(consultaProcedimento);

    return res.json(consultaProcedimento_salvo);
  }

  public async destroy(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const consultaProcedimento = await AppDataSource.manager.findOneBy(ConsultaProcedimento, { id: codigo });

    if(consultaProcedimento == null) {
      return res.status(404).json({ erro: 'Consulta Procedimento não encontrado!' });
    }

    await AppDataSource.manager.delete(ConsultaProcedimento, consultaProcedimento);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const consultaProcedimento = await AppDataSource.manager.findOneBy(ConsultaProcedimento, { id: codigo });

    if(consultaProcedimento == null) {
      return res.status(404).json({ erro: 'Consulta Procedimento não encontrado!' });
    }

    return res.json(consultaProcedimento);
  }
}