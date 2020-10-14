import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/interfaces/todo.interface';
import { TodoActions } from './todo.actions';
import { TodoState } from './todo.state';

@Injectable({
  providedIn: 'root',
})
export class NgxsFacade {
  constructor(
    private readonly store: Store,
  ) { }

  @Select(TodoState.todoList())
  todos$: Observable<Todo[]>;

  @Select(TodoState.todoList(true))
  doneTodos$: Observable<Todo[]>;

  getTodoList = (): void => {
    this.store.dispatch(
      new TodoActions.GetTodoList(),
    );
  }

  setTodoStatus = (id: number, isDone: boolean): void => {
    this.store.dispatch(
      new TodoActions.SetTodoStatus({ id, isDone }),
    );
  }

  deleteTodo = (id: number): void => {
    this.store.dispatch(
      new TodoActions.DeleteTodo({ id }),
    );
  }

  addTodo = (description: string): void => {
    this.store.dispatch(
      new TodoActions.AddTodo({ description }),
    );
  }

  reset = (): void => {
    this.store.dispatch(
      new TodoActions.ClearState(),
    );
  }
}
