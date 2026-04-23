import cors from 'cors';
import express from 'express';
import { ApplicationsController } from './controllers/applications.controller.js';
import { createAnalystsRouter } from './routes/analysts.routes.js';
import { createApplicationsRouter } from './routes/applications.routes.js';
import { AnalystsService } from './services/analysts.service.js';
import { ApplicationsService } from './services/applications.service.js';

const app = express();
const port = 4000;

const applicationsService = new ApplicationsService();
const analystsService = new AnalystsService();
const applicationsController = new ApplicationsController(applicationsService);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/applications', createApplicationsRouter(applicationsController));
app.use('/api/analysts', createAnalystsRouter(analystsService));

app.listen(port, () => {
  console.log(`Credit operations backend listening on http://localhost:${port}`);
});
