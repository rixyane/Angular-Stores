import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/interfaces/todo.interface';

export const getTodoList = createAction(
  '[Todo List] Get list',
);

export const setTodoList = createAction(
  '[Todo List] Set list',
  props<{ list: Todo[] }>(),
);

export const addTodo = createAction(
  '[Todo List] Add item',
  props<{ todo: Todo }>(),
);

export const saveTodo = createAction(
  '[Todo List] Save item',
  props<{ description: string }>(),
);

export const deleteTodo = createAction(
  '[Todo List] Delete item',
  props<{ id: number }>(),
);

export const setTodoStatus = createAction(
  '[Todo List] Set item status',
  props<{ id: number, isDone: boolean }>(),
);

export const clearState = createAction(
  '[Todo List] Clear state',
);
