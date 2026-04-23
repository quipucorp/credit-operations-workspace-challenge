import { Request, Response } from 'express';
import { ApplicationsService } from '../services/applications.service.js';
import { updateStatusSchema } from '../validators/application.validator.js';

export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  list = (req: Request, res: Response) => {
    const status = req.query.status as 'pending' | 'in_review' | 'approved' | 'rejected' | undefined;
    const applications = this.applicationsService.list(status);

    res.json(applications);
  };

  getById = async (req: Request, res: Response) => {
    const application = await this.applicationsService.findById(req.params.id);

    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    res.json(application);
  };

  updateStatus = (req: Request, res: Response) => {
    const result = updateStatusSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ message: 'Invalid payload' });
      return;
    }

    const application = this.applicationsService.updateStatus(req.params.id, result.data.status);

    if (!application) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    res.json(application);
  };
}
