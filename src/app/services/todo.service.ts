import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private todos: Todo[] = [
    {
      id: 0,
      status: 'todo',
      description: 'Implement NgXs store.',
    },
    {
      id: 1,
      status: 'todo',
      description: 'Implement NgRx store.',
    },
    {
      id: 2,
      status: 'todo',
      description: 'Implement Akita store.',
    },
  ];

  constructor() {
    const cached = localStorage.getItem('todos');

    if (cached) {
      this.todos = JSON.parse(cached);
    }
  }

  fetchList = (): Observable<Todo[]> => of(this.todos)
    .pipe(take(1))

  updateList = (list: Todo[]): void => {
    this.todos = list;
    this.cache();
  }

  add = (payload: Todo): Observable<Todo> => {
    const item = {
      ...payload,
      id: +(new Date()),
    };

    this.todos = [
      ...this.todos,
      item,
    ];
    this.cache();

    return of(item)
      .pipe(take(1));
  }

  delete = (todoId: number): void => {
    this.todos = this.todos.filter(({ id }) => id !== todoId);
    this.cache();
  }

  cache = () => localStorage.setItem('todos', JSON.stringify(this.todos));

}
