// export interface Task {
//   id: string
//   text: string
//   isCompleted: boolean
//   isDeleted: boolean
// }


export type Task = Readonly<{
  id: string
  text: string
  is_completed: boolean
  is_deleted: boolean
}>;
