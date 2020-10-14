import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Todo } from 'src/app/interfaces/todo.interface';

export interface TodosState extends EntityState<Todo, number> { }

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'todos' })
export class TodosStore extends EntityStore<TodosState> {
  constructor() {
    super();
  }
}
