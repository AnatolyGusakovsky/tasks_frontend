import z from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  text: z.string(),
  is_completed: z.boolean(),
  is_deleted: z.boolean(),
})



