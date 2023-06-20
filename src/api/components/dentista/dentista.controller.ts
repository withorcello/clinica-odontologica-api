import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Dentista } from './dentista.entity';


export class DentistaController {
  public async list(req: Request, res: Response) {

    const dentista =  await AppDataSource.manager.find(Dentista)

    res.status(200).json({ dados: dentista, total: dentista.length });
  }

  public async create(req: Request, res: Response) {

    let cpf = req.body.cpf;
    let rg = req.body.rg;
    let nome = req.body.nome;
    let numero_registro = req.body.numero_registro;
    let especialidade = req.body.especialidade;
    let celular = req.body.celular;

    let dent = new Dentista();
    dent.cpf = cpf;
    dent.rg = rg;
    dent.nome = nome;
    dent.numero_registro = numero_registro;
    dent.especialidade = especialidade;
    dent.celular = celular;

    const erros = await validate(dent);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const dentista_salvo = await AppDataSource.manager.save(dent);

    res.status(201).json({dentista_salvo});
  }

  public async update(req: Request, res: Response){
  
    const { codigo } = req.params;
    // const cod = req.params.codigo;

    // return res.json({ update: true , codigo_enviado: codigo});

    const dentista = await AppDataSource.manager.findOneBy(Dentista, { id: parseInt(codigo) });

    if(dentista == null) {
      return res.status(404).json({ erro: 'Dentista não encontrado!' });
    }

    let { cpf, nome, numero_registro, especialidade, celular} = req.body;

    dentista.cpf = cpf;
    dentista.nome = nome;
    dentista.numero_registro = numero_registro;
    dentista.especialidade = especialidade;
    dentista.celular = celular;

    const erros = await validate(dentista);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const dentista_salvo = await AppDataSource.manager.save(dentista);

    return res.json(dentista_salvo);
  }

  public async destroy(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const dentista = await AppDataSource.manager.findOneBy(Dentista, { id: parseInt(codigo) });

    if(dentista == null) {
      return res.status(404).json({ erro: 'Dentista não encontrado!' });
    }

    await AppDataSource.manager.delete(Dentista, dentista);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const dentista = await AppDataSource.manager.findOneBy(Dentista, { id: parseInt(codigo) });

    if(dentista == null) {
      return res.status(404).json({ erro: 'Dentista não encontrado!' });
    }

    return res.json(dentista);
  }
}
