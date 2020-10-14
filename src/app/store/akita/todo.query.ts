import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { TodosState, TodosStore } from './todo.store';

@Injectable({
  providedIn: 'root',
})
@QueryConfig({
  sortBy: 'status',
  sortByOrder: Order.DESC,
})
export class TodoQuery extends QueryEntity<TodosState> {
  todos$ = this.selectAll();

  constructor(protected store: TodosStore) {
    super(store);
  }

}
