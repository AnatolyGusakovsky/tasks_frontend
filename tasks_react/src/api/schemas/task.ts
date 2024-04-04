import z from 'zod';

import type {Task} from '../../models/Task';


import { z } from 'zod';

// Define the Zod schema that corresponds to the Task interface
const TaskSchema = z.object({
  id: z.string(),
  text: z.string(),
  is_completed: z.boolean(),
  is_deleted: z.boolean(),
});

// Use Zod's infer method to create a TypeScript type from the Zod schema
type Task = z.infer<typeof TaskSchema>;

// Example function that uses the TaskSchema for runtime validation
async function fetchTask(): Promise<Task> {
  const response = await fetch('/api/task');
  const taskData = await response.json();
  // Validate the response data at runtime using the Zod schema
  const task = TaskSchema.parse(taskData);
  return task; // task is now validated against the Task schema and is of type Task
}

// parses and validates a `lead_sources_api.DefaultFlowRule` thrift struct
// and maps it to a domain `Assignment`
// export const DefaultFlowRuleSchema = z
//   .object({
//     distributionGroup: z
//       .object({
//         memberPersonIds: z.string().array(),
//       })
//       .default({memberPersonIds: []}),
//     workflowId: z.string().optional(),
//   })
//   .transform(
//     ({distributionGroup: {memberPersonIds}, workflowId}): Task => ({
//       distributionGroup: memberPersonIds,
//       workflowId,
//     })
//   )
//   .default({});
