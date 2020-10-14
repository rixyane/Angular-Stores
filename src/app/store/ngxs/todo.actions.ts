// tslint:disable-next-line: no-namespace
export namespace TodoActions {
  export class GetTodoList {
    static readonly type = '[Todo State] Get list';
  }

  export class AddTodo {
    static readonly type = '[Todo State] Add item';
    constructor(
      public readonly payload: {
        description: string;
      },
    ) { }
  }

  export class DeleteTodo {
    static readonly type = '[Todo State] Delete item';
    constructor(
      public readonly payload: {
        id: number;
      },
    ) { }
  }

  export class SetTodoStatus {
    static readonly type = '[Todo State] Set item status';
    constructor(
      public readonly payload: {
        id: number,
        isDone: boolean;
      },
    ) { }
  }

  export class ClearState {
    static readonly type = '[Todo State] Clear state';
  }
}
