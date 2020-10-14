import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { TodoQuery } from './todo.query';
import { TodosStore } from './todo.store';

@Injectable({
  providedIn: 'root',
})
export class AkitaFacade {
  constructor(
    private readonly todoService: TodoService,
    private readonly todoStore: TodosStore,
    private readonly todoQuery: TodoQuery,
  ) { }

  todos$ = this.todoQuery.todos$;

  doneTodos$ = of([]);

  getTodoList = (): void => {
    this.todoService.fetchList()
      .toPromise()
      .then(list => this.todoStore.set(list));
  }

  setTodoStatus = (id: number, isDone: boolean): void => {
    this.todoStore.upsert(id, { status: isDone ? 'done' : 'todo' });
    this.todoService.updateList(this.todoQuery.getAll());
  }

  deleteTodo = (itemId: number): void => {
    this.todoService.delete(itemId);
    this.todoStore.remove(({ id }) => id === itemId);
  }

  addTodo = (description: string): void => {
    this.todoService.add({
      description,
      status: 'todo',
    })
      .toPromise()
      .then(item => this.todoStore.add(item));
  }

  reset = (): void => {
    this.todoStore.reset();
  }
}
