import { Router } from 'express';
import { DentistaController } from './dentista.controller';

export class DentistaRoutes {
  private router: Router = Router();

  private readonly controller: DentistaController;

  constructor() {
    this.controller = new DentistaController();
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