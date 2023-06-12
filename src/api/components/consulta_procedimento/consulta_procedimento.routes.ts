import { Router } from 'express';
import { ConsultaProcedimentoController } from './consulta_procedimento.controller';

export class ConsultaProcedimentoRoutes {
  private router: Router = Router();

  private readonly controller: ConsultaProcedimentoController;

  constructor() {
    this.controller = new ConsultaProcedimentoController();
    this.init();
  }

  private init(): void {
    this.router.get('/', this.controller.list);
    this.router.post('/', this.controller.create);
    this.router.put('/:codigo', this.controller.update);
    this.router.delete('/:codigo', this.controller.destroy);
    this.router.get('/:codigo', this.controller.show);
  }

  public routes(): Router {
    return this.router;
  }
}