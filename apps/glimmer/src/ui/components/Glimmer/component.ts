import Component, { tagForProperty } from '@glimmer/component';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';

function rerender(ctx) {
  const owner = ctx.__owner__;
  owner._rendering = true;
  owner._rerender();
  owner._rendering = false;
  owner._scheduled = false;
}

function markAsDirty(ctx, prop) {
  tagForProperty(ctx,  prop).inner.dirty();
}

function invalidateTask(obj) {
  ['completed','title','id'].map((propName)=>{
    markAsDirty(obj, propName);
  });
  return obj;
}

declare global {
  interface IAPI {
    remaining(): any[];
    completed(): any[];
    addTodo(title: string): void;
    removeTodo(todo: any): void;
    store: {
      todos: any[],
    }
  }
  export interface Window {
    appComponent: Glimmer
  }
  const API: IAPI
}

const api = typeof API !== 'undefined' ? API : { 
    addTodo(title) {},
    removeTodo(todo) {},
    clearCompleted() {},
    store: {
      counter: 0,
      todos: []
    },
    todos() {
      return [];
    },
    remaining() {
      return [];
    },
    completed() {
      return [];
    }
};

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const IS_DEV = window.location.port === '4200';



export default class Glimmer extends Component {
  public counter = 0;

  public editedTodo = null;

  public todos = API.store.todos || [];

  public newField = '';

  public filterIteration = 1;

  public get filteredTodos() {
    const todos = this.todos;
    const filterType = this.nowShowing;
    if (filterType === ALL_TODOS) {
      return todos;
    } else {
      return filterType === ACTIVE_TODOS ? api.remaining() : api.completed();
    }
  }

  public get remaining() {
    const todos = this.todos;
    const remaining = api.remaining();
    return remaining ? remaining.length : todos.filter((todo) => !todo.completed).length;
  }

  didUpdate() {
    setTimeout(() => {
      let input: HTMLElement = this.element.querySelector('.edit');
      if (input) {
        input.focus();
      }
    }, 0);
  }

  get nowShowing() {
    return (
      (this.filterIteration && window.location.hash.replace('#/', '')) || ALL_TODOS
    );
  }

  didInsertElement() {
    window.appComponent = this;
  }

  public setState(newState) {
    //const newState = JSON.parse(JSON.stringify(state));
    this.counter = newState.counter;
    this.todos = newState.todos.map(invalidateTask);
    markAsDirty(this, 'todos');
    markAsDirty(this, 'counter');
    markAsDirty(this, 'nowShowing');
    markAsDirty(this, 'remaining');
    markAsDirty(this, 'filteredTodos');
    rerender(this);
  }

  public onEdit(todo) {
    this.editedTodo = todo;
  }

  public onRemove(todo) {
    this.todos = this.todos.filter((item) => item !== todo);
    api.removeTodo(todo);
  }

  public updateTodo(oldTodo, newTodo) {
    this.todos = this.todos.map((item) => {
      if (item === oldTodo) {
        return newTodo;
      } else {
        return item;
      }
    });
  }

  public maybeFinishEdit(todo, event) {
    if (event.keyCode === ENTER_KEY || event.type === 'blur') {
      const newTodo = { ...todo, ...{ title: event.target.value } };
      this.updateTodo(todo, newTodo);
      this.editedTodo = null;
    } else if (event.keyCode === ESCAPE_KEY) {
      this.editedTodo = null;
    }
  }

  public onCheck(todo, event) {
    const newTodo = { ...todo, ...{ completed: event.target.checked } };
    this.updateTodo(todo, newTodo);
  }

  public handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = event.target.value.trim();

    if (val) {
      this.newField = '';
      this.todos = this.todos.concat({
        completed: false,
        id: Date.now(),
        title: val
      });
      api.addTodo(val);
    }
  }

  public onClearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  public onChangeFilter() {
    this.filterIteration = this.filterIteration + 1;
  }
}
