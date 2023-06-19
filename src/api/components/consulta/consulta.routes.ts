import { Router } from "express";
import { ConsultaController } from "./consulta.controller";

export class ConsultaRoutes {
  private router: Router = Router();

  private controller: ConsultaController;

  constructor() {
    this.controller = new ConsultaController();
    this.init();
  }

  private init(): void {
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findOne);
    this.router.post("/", this.controller.create);
    this.router.patch("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }

  public routes(): Router {
    return this.router;
  }
}
