import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreFacade } from 'src/app/store/store.facade';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {

  public todoDescription = '';

  constructor(
    private readonly store: StoreFacade,
  ) { }

  addItem = (): void => {
    if (!!this.todoDescription) {
      this.store.facade.addTodo(this.todoDescription);
      this.todoDescription = '';
    }
  }

}
