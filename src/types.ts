export interface Todo {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  deleted: boolean;
}

export type Tomato = {
  id: number,
  started_at: Date,
  ended_at: Date,
  duration: number,
  description: string,
  manually_created: boolean
  aborted: boolean
}