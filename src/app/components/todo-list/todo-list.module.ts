import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './todo-list.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TodoListRoutingModule,
  ],
  declarations: [
    TodoListComponent,
    TodoFormComponent,
  ],
})
export class TodoListModule { }
