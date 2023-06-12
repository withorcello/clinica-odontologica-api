import { Router } from "express";
import { BaseRoutes } from "./base/base.routes";
import { PacienteRoutes } from "./paciente/paciente.routes";

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerRoutes(router: Router, prefix: string = ""): void {
  router.use(`${prefix}`, new BaseRoutes().routes());
  router.use(`${prefix}/paciente`, new PacienteRoutes().routes());
}
