import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';
import { selectTodo } from './ngrx.selectors';
import * as TodoActions from './todo.actions';

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() => this.actions$
    .pipe(
      ofType(TodoActions.getTodoList),
      mergeMap(() => this.todoService.fetchList()
        .pipe(
          map(list => TodoActions.setTodoList({ list })),
          catchError(() => EMPTY)
        )),
    ),
  );

  saveTodo$ = createEffect(() => this.actions$
    .pipe(
      ofType(TodoActions.saveTodo),
      mergeMap(action => this.todoService.add({ description: action.description, status: 'todo' })
        .pipe(
          map(todo => TodoActions.addTodo({ todo })),
          catchError(() => EMPTY)
        )),
    ),
  );

  deleteTodo$ = createEffect(() => this.actions$
    .pipe(
      ofType(TodoActions.deleteTodo),
      tap(({ id }) => this.todoService.delete(id)),
      map(() => TodoActions.getTodoList()),
    ),
  );

  setTodoStatus$ = createEffect(() => this.actions$
    .pipe(
      ofType(TodoActions.setTodoStatus),
      withLatestFrom(this.store.select(selectTodo)),
      map(([action, { list }]) => {
        const status: 'done' | 'todo' = action.isDone ? 'done' : 'todo';
        const updatedList = list.map(item => item.id === action.id
          ? { ...item, status }
          : item,
        );

        this.todoService.updateList(updatedList);

        return TodoActions.setTodoList({ list: updatedList });
      }),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly todoService: TodoService,
    private readonly store: Store,
  ) { }
}
