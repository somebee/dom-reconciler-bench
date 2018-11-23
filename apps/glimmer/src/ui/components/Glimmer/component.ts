import Component, { tracked } from '@glimmer/component';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';

const api = typeof API !== 'undefined' ? API : { 
    addTodo() {},
    removeTodo() {},
    clearCompleted() {},
    store: {
      counter: 0,
      todos: []
    },
    todos() {
      return false;
    },
    remaining() {
      return false;
    },
    completed() {
      return false;
    }
};

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const IS_DEV = window.location.port === '4200';

export default class Glimmer extends Component {
  @tracked
  public counter = 0;

  @tracked
  public editedTodo = null;

  @tracked
  public todos = API.store.todos || [];

  @tracked
  public newField = '';

  @tracked
  public filterIteration = 1;

  @tracked
  public get filteredTodos() {
    const todos = this.todos;
    const filterType = this.nowShowing;
    // if (!IS_DEV) {
    if (filterType === ALL_TODOS) {
      return todos;
    } else {
      return filterType === ACTIVE_TODOS ? api.remaining() : api.completed();
    }
    // }

    // if (filterType === ALL_TODOS) {
    //   return this.todos;
    // } else {
    //   return this.todos.filter((todo) => {
    //     return filterType === ACTIVE_TODOS ? !todo.completed : todo.completed;
    //   });
    // }
  }

  @tracked
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

  @tracked
  get nowShowing() {
    return (
      (this.filterIteration && window.location.hash.replace('#/', '')) || ALL_TODOS
    );
  }

  didInsertElement() {
    window.appComponent = this;
  }

  public setState({counter, todos}) {
    this.counter = counter;
    this.todos = todos.map((todo)=>{
      return {...todo};
    });
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
