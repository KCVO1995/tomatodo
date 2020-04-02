export interface Todo {
  id: number;
  description: string;
  completed: boolean;
  editing: boolean;
  deleted: boolean;
}

export type Tomato = {
  started_at: Date,
  ended_at: Date,
  description: string,
  manually_created: true
}