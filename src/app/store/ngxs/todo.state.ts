import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { Todo } from 'src/app/interfaces/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
import { TodoStateModel } from './todo-state.interface';
import { TodoActions } from './todo.actions';

const initialState: TodoStateModel = {
  list: undefined,
  selected: undefined,
};

@State<TodoStateModel>({
  name: 'todo',
  defaults: initialState,
})
@Injectable()
export class TodoState {

  constructor(
    private readonly todoService: TodoService,
  ) { }

  static todoList(isDone?: boolean) {
    const itemStatus = !isDone ? 'todo' : 'done';

    return createSelector(
      [TodoState],
      ({ list }: TodoStateModel) => list.filter(({ status }) => status === itemStatus),
    );
  }

  @Selector()
  static todoItem({ selected }: TodoStateModel): Todo {
    return selected;
  }


  @Action(TodoActions.GetTodoList)
  async getTodoList(
    { patchState }: StateContext<TodoStateModel>,
  ): Promise<void> {
    const list = await this.todoService.fetchList().toPromise();

    patchState({ list });
  }

  @Action(TodoActions.SetTodoStatus)
  setTodoStatus(
    { patchState, getState }: StateContext<TodoStateModel>,
    { payload }: TodoActions.SetTodoStatus,
  ): void {
    const { id, isDone } = payload;
    const { list } = getState();
    const status: 'done' | 'todo' = isDone ? 'done' : 'todo';

    const updatedList = list.map(item => item.id === id
      ? { ...item, status }
      : item,
    );

    this.todoService.updateList(updatedList);
    patchState({
      list: updatedList,
    });
  }

  @Action(TodoActions.AddTodo)
  async addTodo(
    { patchState, getState }: StateContext<TodoStateModel>,
    { payload }: TodoActions.AddTodo,
  ): Promise<void> {
    const { description } = payload;
    const item = await this.todoService.add({
      description,
      status: 'todo',
    }).toPromise();

    patchState({
      list: [...getState().list, item],
    });
  }

  @Action(TodoActions.DeleteTodo)
  deleteTodo(
    { dispatch }: StateContext<TodoStateModel>,
    { payload }: TodoActions.DeleteTodo,
  ): void {
    const { id } = payload;

    this.todoService.delete(id);
    dispatch(new TodoActions.GetTodoList());
  }

  @Action(TodoActions.ClearState)
  clearState(
    { setState }: StateContext<TodoStateModel>,
  ): void {
    setState(initialState);
  }
}
