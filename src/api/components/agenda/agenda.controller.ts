import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Agenda } from './agenda.entity';
import { validate } from 'class-validator';
import { Dentista } from '../dentista/dentista.entity';
import { Paciente } from '../paciente/paciente.entity';

export class AgendaController {
  public async list(req: Request, res: Response) {

    const agenda =  await AppDataSource.manager.find(Agenda)

    res.status(200).json({ dados: agenda, total: agenda.length });
  }

  public async create(req: Request, res: Response) {

    let { tipo, hora, data, dentista, paciente} = req.body;
    
    if(dentista == undefined) {
      return res.status(404).json({ erro: 'Dentista inexistente'})
    }

    const _dentista = await AppDataSource.manager.findOneBy(Dentista, { id: dentista });

    if(_dentista == null) {
      return res.status(404).json({ erro: 'Dentista inexistente'})
    }

    if(paciente == undefined) {
      return res.status(404).json({ erro: 'Paciente inexistente'})
    }

    const _paciente = await AppDataSource.manager.findOneBy(Paciente, { id: paciente });

    if(_paciente == null) {
      return res.status(404).json({ erro: 'Paciente inexistente'})
    }

    let agd = new Agenda();
    agd.tipo = tipo;
    agd.hora = hora;
    agd.data = data;
    agd.dentista = _dentista;
    agd.paciente = _paciente;

    const erros = await validate(agd);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _agenda = await AppDataSource.manager.save(agd);

    res.status(201).json(_agenda);
  }

  public async update(req: Request, res: Response){
  
    const { codigo } = req.params;
    // const cod = req.params.codigo;

    // return res.json({ update: true , codigo_enviado: codigo});

    const agenda = await AppDataSource.manager.findOneBy(Agenda, { id: parseInt(codigo) });

    if(agenda == null) {
      return res.status(404).json({ erro: 'Agenda não encontrada!' });
    }

    let { tipo, hora, data, dentista, paciente} = req.body;
    
    if(dentista == undefined) {
      return res.status(404).json({ erro: 'Dentista inexistente'})
    }

    const _dentista = await AppDataSource.manager.findOneBy(Dentista, { id: dentista });

    if(_dentista == null) {
      return res.status(404).json({ erro: 'Dentista inexistente'})
    }

    if(paciente == undefined) {
      return res.status(404).json({ erro: 'Paciente inexistente'})
    }

    const _paciente = await AppDataSource.manager.findOneBy(Paciente, { id: paciente });

    if(_paciente == null) {
      return res.status(404).json({ erro: 'Paciente inexistente'})
    }

    agenda.tipo = tipo;
    agenda.hora = hora;
    agenda.data = data;
    agenda.dentista = _dentista;
    agenda.paciente = _paciente;

    const erros = await validate(agenda);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _agenda = await AppDataSource.manager.save(agenda);

    return res.json(_agenda);
  }

  public async destroy(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const agenda = await AppDataSource.manager.findOneBy(Agenda, { id: parseInt(codigo) });

    if(agenda == null) {
      return res.status(404).json({ erro: 'Agenda não encontrada!' });
    }

    await AppDataSource.manager.delete(Agenda, agenda);

    return res.status(204).json();
  }

  public async show(req: Request, res: Response){
  
    
    const { codigo } = req.params;

    const agenda = await AppDataSource.manager.findOneBy(Agenda, { id: parseInt(codigo) });

    if(agenda == null) {
      return res.status(404).json({ erro: 'Agenda não encontrada!' });
    }

    return res.json(agenda);
  }
}
