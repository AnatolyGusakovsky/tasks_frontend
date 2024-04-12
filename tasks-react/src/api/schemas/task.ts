import z from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCompleted: z.boolean(),
  isDeleted: z.boolean(),
})



