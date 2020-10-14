import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';


export interface AppState {
  todo: TodoState;
}

export const selectTodo = (state: AppState) => state.todo;

export const todos = createSelector(
  selectTodo,
  (
    { list }: TodoState,
    props: { status: 'done' | 'todo' },
  ) => list && list.filter(({ status }) => status === props.status),
);
