import { Router } from 'express';
import { ApplicationsController } from '../controllers/applications.controller.js';

export function createApplicationsRouter(controller: ApplicationsController): Router {
  const router = Router();

  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.patch('/:id/status', controller.updateStatus);

  return router;
}
