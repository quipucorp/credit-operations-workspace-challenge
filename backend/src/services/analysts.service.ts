import { analystsSeed } from '../data/analysts.seed.js';
import { Analyst } from '../models/analyst.js';

export class AnalystsService {
  list(): Analyst[] {
    return analystsSeed;
  }

  exists(analystId: string): boolean {
    return analystsSeed.some((analyst) => analyst.id === analystId);
  }
}
