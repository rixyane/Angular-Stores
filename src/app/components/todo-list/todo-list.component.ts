import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Todo } from 'src/app/interfaces/todo.interface';
import { StoreFacade } from 'src/app/store/store.facade';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos: Todo[];
  facade = this.store.facade;

  todos$ = combineLatest([
    this.facade.todos$,
    this.facade.doneTodos$,
  ])
    .pipe(
      filter(([todos, doneTodos]) => !!todos && !!doneTodos),
      map(([todos, doneTodos]) => [...todos, ...doneTodos]),
    );

  constructor(
    private readonly store: StoreFacade,
  ) { }

  ngOnInit() {
    this.facade.getTodoList();
  }

  ngOnDestroy() {
    this.facade.reset();
  }

  setItemStatus = (id: number, checked: boolean): void => {
    this.facade.setTodoStatus(id, checked);
  }

  deleteItem = (id: number): void => {
    this.facade.deleteTodo(id);
  }
}
