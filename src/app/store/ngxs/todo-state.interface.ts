import { Todo } from 'src/app/interfaces/todo.interface';

export interface TodoStateModel {
  list: Todo[];
  selected: Todo;
}
