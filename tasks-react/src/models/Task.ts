// export interface Task {
//   id: string
//   text: string
//   isCompleted: boolean
//   isDeleted: boolean
// }


export type Task = Readonly<{
  id: string
  text: string
  isCompleted: boolean
  isDeleted: boolean
}>;
