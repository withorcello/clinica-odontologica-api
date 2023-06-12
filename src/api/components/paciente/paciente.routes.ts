import { Router } from "express";
import { PacienteController } from "./paciente.controller";

export class PacienteRoutes {
  private router: Router = Router();

  private controller: PacienteController;

  constructor() {
    this.controller = new PacienteController();
    this.init();
  }

  private init(): void {
    this.router.get("/", this.controller.findAll.bind(this.controller));
    this.router.get("/:id", this.controller.findOne.bind(this.controller));
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.patch("/:id", this.controller.update.bind(this.controller));
    this.router.delete("/:id", this.controller.delete.bind(this.controller));
  }

  public routes(): Router {
    return this.router;
  }
}
