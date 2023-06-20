import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { ConsultaProcedimento } from './consulta_procedimento.entity';
import { validate } from 'class-validator';
import { Consulta} from '../consulta/consulta.entity';
import { Procedimento} from '../procedimento/procedimento.entity';

export class ConsultaProcedimentoController {
  public async list(req: Request, res: Response) {

    const consultaProcedimento =  await AppDataSource.manager.find(ConsultaProcedimento)

    res.status(200).json({ dados: consultaProcedimento, total: consultaProcedimento.length });
  }

  // async verificarConsulta(){
  //   if (consulta.id == undefined) {
  //     return res.status(404).json({ erro: 'Consulta inexistente' });
  //   }
  
  //   const _consulta = await AppDataSource.manager.findOneBy(Consulta, { id: consulta.id });
  
  //   if (_consulta == null) {
  //     return res.status(404).json({ erro: 'Consulta inexistente' });
  //   }

  //   return _consulta;
  // } 

  public async create(req: Request, res: Response) {

    let { consulta, procedimento, dente, quantidade, valor } = req.body;
    
    
    if(consulta == undefined) {
      return res.status(404).json({ erro: 'Consulta inexistente'})
    }

    const _consulta = await AppDataSource.manager.findOneBy(Consulta, { id: consulta });

    if(_consulta == null) {
      return res.status(404).json({ erro: 'Consulta inexistente'})
    }

    if(procedimento == undefined) {
      return res.status(404).json({ erro: 'Procedimento inexistente'})
    }

    const _procedimento = await AppDataSource.manager.findOneBy(Procedimento, { id: procedimento });

    if(_procedimento == null) {
      return res.status(404).json({ erro: 'Procedimento inexistente'})
    }

    let cp = new ConsultaProcedimento();
    cp.consulta = _consulta;
    cp.procedimento = _procedimento;
    cp.dente = dente;
    cp.quantidade = quantidade;
    cp.valor = valor;

    const erros = await validate(cp);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const consultaProcedimento_salva = await AppDataSource.manager.save(cp);

    res.status(201).json(consultaProcedimento_salva);
  }

  public async update(req: Request, res: Response){
  
    const { codigo } = req.params;
    // const cod = req.params.codigo;

    // return res.json({ update: true , codigo_enviado: codigo});

    const consultaProcedimento = await AppDataSource.manager.findOneBy(ConsultaProcedimento, { id: parseInt(codigo) });

    if(consultaProcedimento == null) {
      return res.status(404).json({ erro: 'Consulta Procedimento não encontrado!' });
    }

    let { consulta, procedimento, dente, quantidade, valor } = req.body;

    if(consulta == undefined) {
      return res.status(404).json({ erro: 'Consulta inexistente'})
    }

    const _consulta = await AppDataSource.manager.findOneBy(Consulta, { id: consulta });

    if(_consulta == null) {
      return res.status(404).json({ erro: 'Consulta inexistente'})
    }

    if(procedimento.id == undefined) {
      return res.status(404).json({ erro: 'Procedimento inexistente'})
    }

    const _procedimento = await AppDataSource.manager.findOneBy(Procedimento, { id: procedimento.id });

    if(_procedimento == null) {
      return res.status(404).json({ erro: 'Procedimento inexistente'})
    }

    consultaProcedimento.consulta = _consulta;
    consultaProcedimento.procedimento = _procedimento;
    consultaProcedimento.dente = dente;
    consultaProcedimento.quantidade = quantidade;
    consultaProcedimento.valor = valor;

    const erros = await validate(consultaProcedimento);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const consultaProcedimento_salvo = await AppDataSource.manager.save(consultaProcedimento);

    return res.json(consultaProcedimento_salvo);
  }

  public async destroy(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const consultaProcedimento = await AppDataSource.manager.findOneBy(ConsultaProcedimento, { id: parseInt(codigo) });

    if(consultaProcedimento == null) {
      return res.status(404).json({ erro: 'Consulta Procedimento não encontrado!' });
    }

    await AppDataSource.manager.delete(ConsultaProcedimento, consultaProcedimento);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const consultaProcedimento = await AppDataSource.manager.findOneBy(ConsultaProcedimento, { id: parseInt(codigo) });

    if(consultaProcedimento == null) {
      return res.status(404).json({ erro: 'Consulta Procedimento não encontrado!' });
    }

    return res.json(consultaProcedimento);
  }
}