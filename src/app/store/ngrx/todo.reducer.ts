import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/interfaces/todo.interface';
import * as TodoActions from './todo.actions';

export interface TodoState {
  list: Todo[];
}

export const initialState: TodoState = {
  list: undefined,
};

const todoReducer = createReducer(
  initialState,
  on(
    TodoActions.clearState,
    () => (initialState),
  ),
  on(
    TodoActions.setTodoList,
    (state, { list }) => ({ ...state, list }),
  ),
  on(
    TodoActions.addTodo,
    (state, { todo }) => ({
      ...state,
      list: [...state.list, todo],
    }),
  ),
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}
