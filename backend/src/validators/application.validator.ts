import { z } from 'zod';

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'in_review', 'approved', 'rejected']),
});

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
