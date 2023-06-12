import { Router } from 'express';
import { AgendaRoutes } from './agenda/agenda.routes';
import { BaseRoutes } from './base/base.routes';
import { DentistaRoutes } from './dentista/dentista.routes';
import { ProcedimentoRoutes } from './procedimento/procedimento.routes';
import { ConsultaProcedimentoRoutes } from './consulta_procedimento/consulta_procedimento.routes';

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerRoutes(router: Router, prefix: string = ""): void {
  router.use(`${prefix}`, new BaseRoutes().routes());
  router.use(`${prefix}/agenda`, new AgendaRoutes().routes());
  router.use(`${prefix}/dentista`, new DentistaRoutes().routes());
  router.use(`${prefix}/procedimento`, new ProcedimentoRoutes().routes());
  router.use(`${prefix}/consultaProcedimento`, new ConsultaProcedimentoRoutes().routes());
}
