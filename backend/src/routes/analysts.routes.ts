import { Router } from 'express';
import { AnalystsService } from '../services/analysts.service.js';

export function createAnalystsRouter(service: AnalystsService): Router {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json(service.list());
  });

  return router;
}
