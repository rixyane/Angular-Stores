import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Select from './ngrx.selectors';
import * as Action from './todo.actions';

@Injectable({
  providedIn: 'root',
})
export class NgrxFacade {
  constructor(
    private readonly store: Store,
  ) { }

  todos$ = this.store.select(Select.todos, { status: 'todo' });
  doneTodos$ = this.store.select(Select.todos, { status: 'done' });

  getTodoList = (): void => {
    this.store.dispatch(
      Action.getTodoList(),
    );
  }

  setTodoStatus = (id: number, isDone: boolean): void => {
    this.store.dispatch(
      Action.setTodoStatus({ id, isDone }),
    );
  }

  deleteTodo = (id: number): void => {
    this.store.dispatch(
      Action.deleteTodo({ id }),
    );
  }

  addTodo = (description: string): void => {
    this.store.dispatch(
      Action.saveTodo({ description }),
    );
  }

  reset = (): void => {
    this.store.dispatch(
      Action.clearState(),
    );
  }
}
